import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ResponseJSON } from "../../../utils/response";
import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";

export class UserController {
  public async get(req: Request, res: Response): Promise<object> {
    const response = await UserService.getAllUser();
    if (response === null) {
      return res
        .status(400)
        .json(
          await ResponseJSON.failureResponse("Failed to retrieve the data!")
        );
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse(
          "Success retrieve the data!",
          response
        )
      );
  }

  public async getById(req: Request, res: Response): Promise<object> {
    const response = await UserService.getUserById(req.params.id);
    if (response === null) {
      return res
        .status(400)
        .json(await ResponseJSON.failureResponse("Data not found"));
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse("Yay! We got the data!", response)
      );
  }

  public async insert(req: Request, res: Response): Promise<object> {
    const response = await UserService.insertUser(req.body);
    if (response === false) {
      return res
        .status(400)
        .json(await ResponseJSON.failureResponse("Failed to insert data!"));
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse("Success insert data!", response)
      );
  }

  public async update(req: Request, res: Response): Promise<object> {
    const response = await UserService.updateUser(req.body, req.params.id);
    if (response === false) {
      return res
        .status(400)
        .json(await ResponseJSON.failureResponse("Failed to update data!"));
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse("Success update data!", response)
      );
  }

  public async delete(req: Request, res: Response): Promise<object> {
    const response = await UserService.deleteUser(req.params.id);
    if (response === false) {
      return res
        .status(400)
        .json(await ResponseJSON.failureResponse("Failed to delete data"));
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse("Success delete data!", response)
      );
  }

  public async login(req: Request, res: Response): Promise<any> {
    await UserController.getValidationResult(req, res);
    const response = await UserService.loginUser(
      await UserController.getParamsForLogin(req)
    );
    if (response === null) {
      return res
        .status(400)
        .json(
          await ResponseJSON.failureResponse("Username or Password is wrong")
        );
    }
    return res
      .status(200)
      .json(
        await ResponseJSON.successResponse(
          "Login Success",
          await UserController.jwtSign(response)
        )
      );
  }

  public async verify(req: Request, res: Response): Promise<object> {
    const credentials = await UserController.jwtVerify(
      req.headers.token,
      process.env.JSON_SECRET_KEY
    );
    if (!credentials) {
      return res
        .status(400)
        .json(await ResponseJSON.failureResponse("Verify failed"));
    }
    return res
      .status(200)
      .json(await ResponseJSON.successResponse("Verify passed!", credentials));
  }

  private static jwtSign(response: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      UserController.getPayloadForJwt(response)
        .then(
          (data: object): void => {
            const token = jwt.sign(data, process.env.JSON_SECRET_KEY);
            resolve(token);
          }
        )
        .catch(
          (err: any): void => {
            reject(err);
          }
        );
    });
  }

  private static jwtVerify(
    token: string | Array<string>,
    secretKey: string
  ): Promise<any> {
    return new Promise<any>(resolve => {
      const credentials = jwt.verify(token, secretKey);
      resolve(credentials);
    });
  }

  private static getValidationResult(
    req: Request,
    res: Response
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        reject(res.status(400).json({ errors: errors.array() }));
      }
      resolve();
    });
  }

  private static getParamsForLogin(req: Request): Promise<object> {
    return new Promise<any>(resolve => {
      resolve({
        username: req.body.username,
        password: req.body.password
      });
    });
  }

  private static getPayloadForJwt(response: any): Promise<object> {
    return new Promise<any>(resolve => {
      resolve({
        nama_user: response.nama_user,
        username: response.username,
        password: response.password
      });
    });
  }
}
