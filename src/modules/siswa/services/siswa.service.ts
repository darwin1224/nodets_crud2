import * as mongoose from "mongoose";
import { Siswa } from "../models/siswa.model";

export class SiswaService {
  private static siswa: any = mongoose.model("Siswa", Siswa);

  public static getAllSiswa(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.siswa.find(
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static getSiswaById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.siswa.findById(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static insertSiswa(data: Array<object>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.siswa.create(
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static updateSiswa(data: Array<object>, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.siswa.findByIdAndUpdate(
        id,
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static deleteSiswa(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.siswa.findByIdAndRemove(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }
}
