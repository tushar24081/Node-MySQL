import express, { query } from "express";
import dotenv from "dotenv";
import multer from "multer";
import mysql2 from "mysql2"
import bodyParser from "body-parser";
const app = express();
const first_name = ["Aarav", "Aryan", "Aditi", "Aishwarya", "Amit", "Amrita", "Ananya", "Anika", "Anjali", "Arjun", "Arnav", "Aryan", "Ashok", "Bharat", "Bindiya", "Chaitanya", "Chandni", "Chetan", "Darshan", "Devanshi", "Dhruv", "Diya", "Ganesh", "Garima", "Gaurav", "Gayatri", "Gitanjali", "Hari", "Hema", "Isha", "Ishan", "Jasmine", "Jayant", "Jhanvi", "Jigar", "Karan", "Kavita", "Khushi", "Kiran", "Lakshmi", "Madhuri", "Mahi", "Manav", "Meera", "Megha", "Mohit", "Mukesh", "Naveen", "Neha", "Nidhi", "Pallavi", "Parineeti", "Parth", "Pooja", "Pradeep", "Prakash", "Priya", "Rajesh", "Rajni", "Rakesh", "Raman", "Ravi", "Rekha", "Rhea", "Rohit", "Roshni", "Rupal", "Sachin", "Sakshi", "Samar", "Sarika", "Shivani", "Shivansh", "Shruti", "Shweta", "Simran", "Sohan", "Sourav", "Sridhar", "Srinivas", "Sudhir", "Sukanta", "Supriya", "Suresh", "Swathi", "Tanuja", "Tanya", "Tarun", "Tripti", "Uma", "Urvashi", "Vasudev", "Vidya", "Vikrant", "Vinay", "Vineet", "Vishal", "Vivek", "Yogesh", "Zoya"];

const last_name = ["Agarwal", "Ahuja", "Arora", "Bhalla", "Bhatia", "Chauhan", "Chopra", "Das", "Datta", "Dawar", "Dhar", "Gandhi", "Gaur", "Gupta", "Jain", "Jha", "Kapoor", "Kashyap", "Kaur", "Khanna", "Kohli", "Lal", "Mehta", "Mishra", "Mitra", "Nagpal", "Nair", "Narang", "Nayyar", "Pandey", "Pant", "Parikh", "Patel", "Patil", "Rao", "Reddy", "Saha", "Sen", "Sharma", "Shukla", "Singh", "Sinha", "Tiwari", "Trivedi", "Verma", "Vohra", "Wadhwa", "Yadav", "Bose", "Chatterjee", "Dasgupta", "Ganguly", "Ghosh", "Guha", "Banerjee", "Bhattacharya", "Dey", "Dutta", "Mukherjee", "Sarkar", "Chakraborty", "Roy", "Sengupta", "Majumdar", "Bhattacharjee", "Choudhury", "Das", "Saha", "Chakravarty", "Ghoshal", "Roychoudhury", "Bhowmik", "Mukhopadhyay", "Mitra", "Banerjee", "Nag", "Saha", "Pal", "Mondal", "Kundu", "Sarkar", "Bharadwaj", "Bhatt", "Rai", "Nayar", "Menon", "Nambiar", "Nathan", "Menon", "Mohan", "Chand", "Rajan", "Nair", "Pillai", "Soman", "Nambiar", "Sivaraman", "Kurup", "Nair", "Gopinath", "Krishnan", "Vijayan", "Prakash", "Mohanan"];

const tusharCities = ["Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Pune", "Aurangabad", "Bhopal", "Chandigarh", "Coimbatore", "Faridabad", "Gurgaon", "Guwahati", "Jaipur", "Lucknow", "Nagpur", "Nashik", "Patna", "Surat", "Thane", "Vadodara", "Varanasi", "Visakhapatnam", "Amritsar", "Agra", "Aligarh", "Allahabad", "Bhubaneswar", "Calicut", "Gwalior", "Indore", "Jabalpur", "Jammu", "Kanpur", "Ludhiana", "Madurai", "Meerut", "Moradabad", "Muzaffarnagar", "Noida", "Ranchi", "Solapur", "Udaipur", "Vijayawada", "Bareilly", "Dehradun", "Jodhpur", "Kota", "Rajkot", "Shimla", "Tiruchirappalli", "Vellore", "Warangal", "Ajmer", "Akola", "Bhiwandi", "Bhavnagar", "Bokaro", "Dhanbad", "Gorakhpur", "Jhansi", "Kolhapur", "Rourkela", "Srinagar", "Thiruvananthapuram", "Ujjain"];

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
    var query = "SELECT * FROM Student.Student_Mst ORDER BY id desc LIMIT 100 ";
    connection.query(query, (err, ans) => {
        if(err) return console.log("None");
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



app.get("/delete-data/:id", (req, res) => {
    var query = `DELETE FROM Student.Student_Mst where id = ${req.params.id}`;
    connection.query(query, (err, ans) => {
        if(err) return res.send(err.message);
        return res.send("Data has been Deleted")
    })
    
})

app.post("/search", (req, res) => {
    var query = `SELECT * FROM Student.Student_Mst where First_Name LIKE '${req.body.query}%'`;
    connection.query(query, (err, ans) => {
        if(err) return res.send(err.message);
        res.render("search", {data: ans})
    })
})

app.get("/insert-bulk", (req, res) => {
    for (let i = 0; i < 500; i++) {
        let randomForName = Math.floor(Math.random() * first_name.length);
        let randomForLastName = Math.floor(Math.random() * last_name.length);
        let email = first_name[randomForName] + last_name[randomForLastName] + "@gmail.com"
        let randomCity = Math.floor(Math.random() * tusharCities.length)
        let tusharContact = Math.floor(100000000 + Math.random() * 900000000);
        let tusharUniversity = Math.floor(Math.random() * 10) + 1;
    
        var query = `INSERT INTO Student.Student_Express (First_Name, Last_Name, Contact_No, City, Email, University, createdAt) VALUES ('${first_name[randomForName]}', '${last_name[randomForLastName]}', '${tusharContact}', '${tusharCities[randomCity]}', '${email}', ${tusharUniversity}, NOW() + INTERVAL FLOOR(RAND() * 365) DAY + INTERVAL FLOOR(RAND() * 24) HOUR + INTERVAL FLOOR(RAND() * 60) MINUTE + INTERVAL FLOOR(RAND() * 60) SECOND)`;
    
        connection.query(query, (err, res) => {
          if(err) return console.log(err.message);
          
        })
      }
      res.send("Data has been added successfully!")
});
app.listen(process.env.PORT)