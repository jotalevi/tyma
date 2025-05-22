import { Injectable } from "@nestjs/common";
import * as os from "os";

@Injectable()
export class AppService {
  private readonly startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  private formatUptime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  getMetrics(): Record<string, any> {
    const uptimeSeconds = process.uptime();
    const memoryUsage = process.memoryUsage();
    const loadAverage = os.loadavg();
    const cpuUsage = process.cpuUsage();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();

    return {
      service: {
        uptime: this.formatUptime(uptimeSeconds),
        startTime: new Date(this.startTime).toISOString(),
        environment: process.env.NODE_ENV ?? "development",
        nodeVersion: process.version,
        pid: process.pid,
        workingDirectory: process.cwd(),
        execPath: process.execPath
      },
      resources: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
        loadAverage: loadAverage.map(avg => avg.toFixed(2)),
        cpuUsage: `${cpuUsage.user / 1000} ms user, ${cpuUsage.system / 1000} ms system`
      },
      os: {
        freeMemory: `${(freeMemory / 1024 / 1024).toFixed(2)} MB`,
        totalMemory: `${(totalMemory / 1024 / 1024).toFixed(2)} MB`,
        platform: os.platform(),
        arch: os.arch(),
        release: os.release()
      }
    };
  }
}
