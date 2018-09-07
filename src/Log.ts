import * as fs from 'fs'

export class Log {
  public static getLastStarCount(): number {
    const logJson: any = JSON.parse(fs.readFileSync(`${__dirname}/../log.json`, { encoding: 'UTF-8' }));
    return logJson.last_star_count;
  }
  public static setLog(log: string): void {
    fs.writeFileSync(`${__dirname}/../log.json`, log, { encoding: 'UTF-8' })
  }
}