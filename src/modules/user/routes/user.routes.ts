import { UserController } from "../controllers/user.controller";
import { validate } from "../requests/user.request";

export class UserRoute {
  private user: UserController = new UserController();

  public routes(app: any): void {
    app.get("/user", this.user.get);
    app.get("/user/:id", this.user.getById);
    app.post("/user", this.user.insert);
    app.put("/user/:id", this.user.update);
    app.delete("/user/:id", this.user.delete);
    app.post('/login', validate, this.user.login)
    app.get('/verify', this.user.verify)
  }
}
