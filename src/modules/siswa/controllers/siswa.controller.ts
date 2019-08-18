import { Request, Response } from "express";
import { SiswaService } from "../services/siswa.service";
import { ResponseJSON } from "../../../utils/response";

export class SiswaController {
  public async get(req: Request, res: Response): Promise<object> {
    const response = await SiswaService.getAllSiswa();
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
    const response = await SiswaService.getSiswaById(req.params.id);
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
    const response = await SiswaService.insertSiswa(req.body);
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
    const response = await SiswaService.updateSiswa(req.body, req.params.id);
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
    const response = await SiswaService.deleteSiswa(req.params.id);
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
}
