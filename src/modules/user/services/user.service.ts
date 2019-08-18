import * as mongoose from "mongoose";
import { User } from "../models/user.model";

export class UserService {
  private static user: any = mongoose.model("User", User);

  public static getAllUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.find(
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static getUserById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.findById(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static insertUser(data: Array<object>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.create(
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static updateUser(data: Array<object>, id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.findByIdAndUpdate(
        id,
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static deleteUser(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.findByIdAndRemove(
        id,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }

  public static loginUser(data: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.findOne(
        data,
        (err: any, data: any): any => {
          if (err) reject(false);
          resolve(data);
        }
      );
    });
  }
}
