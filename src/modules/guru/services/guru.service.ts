import * as mongoose from "mongoose";
import { Guru } from "../models/guru.model";

export class GuruService {
  private static guru: any = mongoose.model("Guru", Guru);

  public static getAllGuru(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.guru.find(
        (err: any, data: any): any => {
          console.log(data);
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static getGuruById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.guru.findById(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static insertGuru(data: Array<object>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.guru.create(
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static updateGuru(data: Array<object>, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.guru.findByIdAndUpdate(
        id,
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static deleteGuru(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.guru.findByIdAndRemove(
        id,
        (err: any, data: any): any => {
          if (err) reject(err);
          resolve(data);
        }
      );
    });
  }
}
