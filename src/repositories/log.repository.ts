import { BaseRepository } from "./base.repository";
import Log, { ILog } from "../models/log.model";

export class LogRepository extends BaseRepository<ILog> {
  constructor() {
    super(Log);
  }
}
