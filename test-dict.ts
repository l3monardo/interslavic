import { Dictionary } from './src/services/dictionary';
import fs from 'fs';

const rawData = fs.readFileSync('./public/dictionary.csv', 'utf8'); // Wait, let's just find the dictionary files
console.log(fs.readdirSync('./public'));
