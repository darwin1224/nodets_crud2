interface KelasInterface {
  get(req: Request, res: Response): Promise<object>;
  getById(req: Request, res: Response): Promise<object>;
  insert(req: Request, res: Response): Promise<object>;
  update(req: Request, res: Response): Promise<object>;
  delete(req: Request, res: Response): Promise<object>;
}

export default KelasInterface