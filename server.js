import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import mysql2 from "mysql2"
import bodyParser from "body-parser";
const app = express();
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", "ejs");
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Student"
})

connection.connect((err, acc) => {
    if(err) return console.log(err.message);
    return console.log("Connected Successfully");
})

const upload = multer({dest: "upload"})
dotenv.config();



app.get("/", (req, res) => {
    var query = `SELECT id, name FROM Student.University_Mst`;
    connection.query(query, (err, ans) => {
        if(err) return console.log("None");
        res.render("index", {name: ans})
    })
    
})

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file.path, req.file.originalname);
    res.send("File has been uploaded successfully")
})

app.post("/insert-data", upload.single("file"), (req, res) => {
    console.log(req.body);
    let fname = req.body.fname;
    let lname = req.body.lname;
    let cno = req.body.cno;
    let city = req.body.city;
    let email = req.body.email;
    let uni = req.body.college;
    console.log(typeof(uni));
    let insert_query = `INSERT INTO Student_Mst(First_Name, Last_Name, Contact_No, City, Email, University, createdAt)
    values('${fname}', '${lname}', '${cno}', '${city}', '${email}', ${uni}, NOW())`;
    connection.query(insert_query, (err, ans) => {
        if(err) return console.log(err.message);
        console.log(ans);
        return res.send("Data has been submitted to database")
    })
})

app.get("/get-data", (req, res) => {
    var query = "SELECT * FROM Student.Student_Mst order by rand() LIMIT 100 ";
    connection.query(query, (err, ans) => {
        if(err) return console.log("None");
        console.log("came here");
        res.render("data", {data: ans});
    })
})
app.get("/get-data/:id", (req, res) => {
    var query = `SELECT * FROM Student.Student_Mst WHERE id = ${req.params.id}`;
    connection.query(query, (err, ans) => {
        if(err) return console.log("None");
        console.log(ans);
        res.render("data", {data: ans});

    })
})

app.get("/update-form/:id", (req, res) => {
    const id = req.params.id;
    var query = `SELECT * FROM Student.Student_Mst WHERE id = ${id}`;
    connection.query(query, (err, ans) => {
        if(err) return console.log("None");
        console.log(ans);
        // return res.json(ans);
        console.log(ans[0].First_Name);
        res.render("update", {data: ans, id: id})

    })
    
})


app.post("/update-data/:id", upload.single("file"), (req, res) => {
    if(req.body._method === "PUT"){

    let fname = req.body.fname;
    let lname = req.body.lname;
    let cno = req.body.cno;
    let city = req.body.city;
    let email = req.body.email;
    console.log(typeof(uni));
    var query = `UPDATE Student.Student_Mst SET First_Name = '${fname}', Last_Name = '${lname}', Contact_No = '${cno}', City = '${city}', Email = '${email}' where id = ${req.params.id}`;

    connection.query(query, (err, ans) => {
        if(err) return res.send(err.message)
        return res.send("Data Updated")
    })
}
})



app.delete("/delete-data/:id", (req, res) => {

})
app.listen(process.env.PORT)