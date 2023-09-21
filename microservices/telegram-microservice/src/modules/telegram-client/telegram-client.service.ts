import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { API_HASH, API_ID } from 'src/constants/api.constant';
import { Logger, TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';

@Injectable()
export class TelegramClientService {
  nameDir = 'users';

  constructor() {}

  async getClient(sessionId: string) {
    const client = new TelegramClient(
      join(this.nameDir, sessionId),
      API_ID,
      API_HASH,
      {
        autoReconnect: false,
        baseLogger: new Logger(LogLevel.WARN),
      },
    );

    await client.connect();

    return client;
  }
}
