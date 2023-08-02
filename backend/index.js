import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123@Kills",
  database: "test"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database!");
  }
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.json("Hello i have a msg frm backend")
});

app.get("/books", (req, res)=>{
  const q = "SELECT * FROM books"
  db.query(q, (err, data)=>{
    if (err) return res.json(err)
    return res.json(data)
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added");
  });
});

app.delete("/delete/:id", (req, res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?"

  db.query(q, [bookId], (err, data)=>{
    if (err) return res.json(err);
    return res.json("book deleted");
  })
})


app.listen(8000, ()=>{
  console.log("Connected to backend!")
});
