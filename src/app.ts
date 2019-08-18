import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as path from "path";
import * as session from "express-session";
import * as dotenv from "dotenv";

import { KelasRoute } from "./modules/kelas/routes/kelas.route";
import { GuruRoute } from "./modules/guru/routes/guru.route";
import { SiswaRoute } from "./modules/siswa/routes/siswa.route";
import { UserRoute } from "./modules/user/routes/user.routes";

dotenv.config({ silent: true });

class App {
  public app: express.Application = express();
  public kelas: KelasRoute = new KelasRoute();
  public guru: GuruRoute = new GuruRoute();
  public siswa: SiswaRoute = new SiswaRoute();
  public user: UserRoute = new UserRoute();
  private readonly PORT: string | number = process.env.PORT || 3000;
  private readonly mongoUrl: string =
    process.env.MONGO_URL || "mongodb://localhost:27017/nodets_crud";

  public constructor() {
    this.init();
    this.getRoutePath();
    this.listen();
  }

  private init(): void {
    this.setViewEngine();
    this.setPublicPath();
    this.setBodyParser();
    this.setCors();
    this.setExpressSession();
    this.setUpMongoDb();
  }

  private setViewEngine(): void {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "hbs");
  }

  private setPublicPath(): void {
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private setBodyParser(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private setCors(): void {
    this.app.use(cors());
  }

  private setExpressSession(): void {
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "darwin",
        resave: false,
        saveUninitialized: true
      })
    );
  }

  private setUpMongoDb(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    mongoose.connection.once(
      "open",
      (): void => {
        console.log("Database is connected");
      }
    );
  }

  private getRoutePath(): void {
    this.getKelasRoute();
    this.getGuruRoute();
    this.getSiswaRoute();
    this.getUserRoute();
  }

  private getKelasRoute(): void {
    this.kelas.routes(this.app);
  }

  private getGuruRoute(): void {
    this.guru.routes(this.app);
  }

  private getSiswaRoute(): void {
    this.siswa.routes(this.app);
  }

  private getUserRoute(): void {
    this.user.routes(this.app);
  }

  private listen(): void {
    this.app.listen(
      this.PORT,
      (): void => {
        return console.log(`Server is running at port ${this.PORT}`);
      }
    );
  }
}

export default new App();
