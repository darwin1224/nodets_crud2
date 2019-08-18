import { SiswaController } from "../controllers/siswa.controller";

export class SiswaRoute {
  private siswa: SiswaController = new SiswaController();

  public routes(app: any): void {
    app.get("/siswa", this.siswa.get);
    app.get("/siswa/:id", this.siswa.getById);
    app.post("/siswa", this.siswa.insert);
    app.put("/siswa/:id", this.siswa.update);
    app.delete("/siswa/:id", this.siswa.delete);
  }
}
