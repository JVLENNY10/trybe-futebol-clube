import fs = require('fs');
import { sign, Secret } from 'jsonwebtoken';

const jwtConfig = { expiresIn: '1d' };

const password = fs.readFileSync('../../jwt.evaluation.key');

const jwtGenerator = (payload = {}): Secret => (
  sign({ data: payload }, password, jwtConfig)
);

export default jwtGenerator;
