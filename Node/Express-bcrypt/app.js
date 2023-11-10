const express = require ("express");
const db = require("better-sqlite3")("database.db", { verbose: console.log });
const bcrypt = require("bcrypt");  

const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.get("/showusers", (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all();
    res.send(users); 
}
})

app.get("/login", (req, res) => { 
    res.sendFile(__dirname + "/public/login.html");
});

app.post("/login", (req, res) => {
    const userSTMT = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = userSTMT.get(req.body.email);

    const compare = bcrypt.compareSync(req.body.password, user.password);
    console.log(compare);

    if (compare) {
        req.session.user = user;
        res.send("Login successful");
    }
});

app.post("/addUser", (req, res) => {
    const insertStmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    const hash = bcrypt.hashSync(req.body.password, 10);
    insertStmt.run(req.body.name, req.body.email, hash);
    res.send("User added successfully");
});


app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
