const db = require("better-sqlite3")("database.db", { verbose: console.log });

const createScript = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT
    )        
`

db.exec(createScript);