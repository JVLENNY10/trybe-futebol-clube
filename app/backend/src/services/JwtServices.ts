import fs = require('fs');
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

class JwtServices {
  private jwtSecret: string;
  private config: object;

  constructor() {
    this.jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    this.config = { expiresIn: '1d' };
  }

  public encoder = (payload = {}): Secret => sign({ data: payload }, this.jwtSecret, this.config);
  public decoder = (token: string): string | JwtPayload => verify(token, this.jwtSecret);
}

export default JwtServices;
