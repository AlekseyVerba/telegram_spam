import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join, resolve } from 'path';
import { existsSync, mkdirSync, promises, writeFileSync } from 'fs'
import { randomUUID } from 'crypto'

@Injectable()
export class FileService {
  PATH_FILE_STATIC = join(resolve(), 'upload');

  constructor() {}

  createFile(file: Express.Multer.File) {
    const typeFile = this.getTypeOfFile(file);
    const pathDir = join(this.PATH_FILE_STATIC);

    if (!existsSync(pathDir)) {
      mkdirSync(pathDir, { recursive: true });
    }

    const nameFile = randomUUID();
    const fullNameFile = `${nameFile}.${typeFile}`;
    const fullPathFile = join(pathDir, fullNameFile);

    try {
      writeFileSync(fullPathFile, file.buffer);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return {
      fullPath: fullNameFile,
      typeFile: typeFile,
      nameFile
    };
  }

  async deleteFile(filePath: string) {
    try {
      const fullPathFile = join(this.PATH_FILE_STATIC, filePath);

      if (existsSync(fullPathFile)) {
        promises.unlink(fullPathFile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getTypeOfFile(file: Express.Multer.File) {
    return file.originalname.split('.').slice(-1).pop();
  }
}
