import { GuruController } from "../controllers/guru.controller";

export class GuruRoute {
  private guru: GuruController = new GuruController();

  public routes(app: any): void {
    app.get("/guru", this.guru.get);
    app.get("/guru/:id", this.guru.getById);
    app.post("/guru", this.guru.insert);
    app.delete("/guru/:id", this.guru.delete);
  }
}
