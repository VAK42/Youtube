import fs from 'fs';
import path from 'path';
import db from './client.server';
const schemaPath = path.join(process.cwd(), 'app', 'db', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);