import { injectable, inject } from "inversify";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import { LogService } from "../services/log.service";
import { ILog } from "../models/log.model";

@injectable()
export class LogWorker {
  constructor(
    @inject(LogService)
    private logService: LogService
  ) {}

  async processLogs() {
    console.log("Log işleme başladı...");

    const logDir = path.join(process.cwd(), "logs");

    if (!fs.existsSync(logDir)) {
      console.warn("Logs klasörü bulunamadı:", logDir);
      return;
    }

    // Log dosyalarını oku
    const files = fs
      .readdirSync(logDir)
      .filter((file) => file.endsWith(".log"));

    if (files.length === 0) {
      console.log("İşlenecek log dosyası bulunamadı.");
      return;
    }

    const allLogs: { [key: string]: ILog } = {};
    const errorLogs: Set<string> = new Set();

    for (const file of files) {
      const filePath = path.join(logDir, file);
      const logContent = fs.readFileSync(filePath, "utf8");
      const logEntries = logContent.split("\n").filter((line) => line.trim());

      if (logEntries.length === 0) {
        console.log(`Dosyada işlenecek log bulunamadı: ${file}`);
        continue;
      }

      for (const entry of logEntries) {
        try {
          const logData: ILog = JSON.parse(entry);
          const requestId = logData.requestId;

          if (file.includes("errors")) {
            errorLogs.add(requestId);
            allLogs[requestId] = logData;
          } else if (!errorLogs.has(requestId)) {
            allLogs[requestId] = logData;
          }
        } catch (error) {
          console.error(`Log satırı işlenemedi: ${entry}`);
        }
      }

      fs.writeFileSync(filePath, "", "utf8");
      console.log(`İşlendi ve dosya temizlendi: ${file}`);
    }

    // Veritabanına kayıt işlemi
    for (const log of Object.values(allLogs)) {
      await this.logService.createLog(log);
    }

    console.log("Tüm loglar işlendi.");
  }

  startCronJob() {
    console.log("Cronjob başlatıldı. Her gün 23:59:50'de çalışacak...");

    cron.schedule("50 59 23 * * *", async () => {
      console.log("Günlük log işlemi başladı...");
      await this.processLogs();
    });
  }
}
