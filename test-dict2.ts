import { Dictionary } from './src/services/dictionary';
import { loadTablesData } from './src/services/loadTablesData';
import fs from 'fs';

async function test() {
    const rawData = fs.readFileSync('./static/data/basic.json', 'utf8');
    const db = JSON.parse(rawData);
    Dictionary.init(db.wordList, db.searchIndex);
    
    const [results] = Dictionary.translate({
        inputText: 'sam',
        from: 'isv',
        to: 'en',
        searchType: 'full',
        posFilter: '',
    }, false);
    
    console.log(JSON.stringify(results.map(r => ({
        isv: Dictionary.getField(r, 'isv'),
        details: Dictionary.getField(r, 'partOfSpeech')
    })), null, 2));
}

test().catch(console.error);
