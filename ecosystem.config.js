module.exports = {
  apps: [
    {
      name: "ezanvakti-imsakiyem-api",
      script: "dist/server.js",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      watch: true, 
      max_memory_restart: "20000M", 
      out_file: "./logs/out.log", // Standart çıkışları loglar
      error_file: "./logs/error.log", // Hataları loglar
      merge_logs: true, // Logları birleştirir
      autorestart: true, // Çökme durumunda otomatik yeniden başlatır
    },
  ],
};
