import { KelasController } from "../controllers/kelas.controller";

export class KelasRoute {
  private kelas: KelasController = new KelasController();

  public routes(app: any): void {
    app.get("/kelas", this.kelas.get);
    app.get("/kelas/:id", this.kelas.getById);
    app.post("/kelas", this.kelas.insert);
    app.put("/kelas/:id", this.kelas.update);
    app.delete("/kelas/:id", this.kelas.delete);
  }
}
