import Dexie from 'dexie';

const db = new Dexie('DexieDb');
db.version(1).stores({ questions: '++Id' });

export default db;
