const express = require ("express");
const db = require("better-sqlite3")("database.db", { verbose: console.log });

const app = express();



app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
