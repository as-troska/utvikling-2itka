const express = require ("express");
const db = require("better-sqlite3")("database.db", { verbose: console.log });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/showusers", (req, res) => {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    res.send(users);
})

app.post("/login", (req, res) => {
    const userSTMT = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = userSTMT.get(req.body.email);

    if (user.password === req.body.password) {
        res.send("Login successful");
    }
});

app.post("/addUser", (req, res) => {
    const insertStmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    insertStmt.run(req.body.name, req.body.email, req.body.password);
    res.send("User added successfully");
});


app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
