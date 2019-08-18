import { Request, Response } from "express";
import { KelasService } from "../services/kelas.service";
import { ResponseJSON } from "../../../utils/response";

interface KelasInterface {
  get(req: Request, res: Response): Promise<object>;
  getById(req: Request, res: Response): Promise<object>;
  insert(req: Request, res: Response): Promise<object>;
  update(req: Request, res: Response): Promise<object>;
  delete(req: Request, res: Response): Promise<object>;
}

export class KelasController implements KelasInterface {
  public async get(req: Request, res: Response): Promise<object> {
    const response = await KelasService.getAllKelas();
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
    const response = await KelasService.getKelasById(req.params.id);
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
    const response = await KelasService.insertKelas(req.body);
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
    const response = await KelasService.updateKelas(req.body, req.params.id);
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
    const response = await KelasService.deleteKelas(req.params.id);
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
