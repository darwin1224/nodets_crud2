import * as mongoose from "mongoose";
import { Kelas } from "../models/kelas.model";

export class KelasService {
  private static kelas: any = mongoose.model("Kelas", Kelas);

  public static getAllKelas(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.kelas.find(
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static getKelasById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.kelas.findById(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static insertKelas(data: Array<object>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.kelas.create(
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static updateKelas(data: Array<object>, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.kelas.findByIdAndUpdate(
        id,
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static deleteKelas(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.kelas.findByIdAndRemove(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }
}
