import * as express from 'express';
import loginRoutes from './routes/loginRoutes';
import teamsRoutes from './routes/teamsRoutes';
import matchesRoutes from './routes/matchesRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(loginRoutes);
    this.app.use(teamsRoutes);
    this.app.use(matchesRoutes);
    this.app.use(leaderboardRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
