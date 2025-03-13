import { injectable, inject } from "inversify";
import { LogRepository } from "../repositories/log.repository";
import { ILog } from "../models/log.model";

@injectable()
export class LogService {
  constructor(
    @inject(LogRepository)
    private logRepo: LogRepository
  ) {}

  async getAllLogs() {
    return this.logRepo.find({});
  }

  async getLogById(logId: string) {
    return this.logRepo.findById(logId);
  }

  async createLog(logData: ILog) {
    return this.logRepo.create(logData);
  }

  async searchLogs(query: Partial<ILog>) {
    return this.logRepo.find(query);
  }

 
}
