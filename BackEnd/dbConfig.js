import {createConnection} from "mysql2";


const connection = createConnection({
    host : "localhost",
    user : "root",
    password : "cdac",
    database : "CM"
})


connection.connect( (err)=>{
    if(err){
        console.log("database connection failed");
    } else {
        console.log("database connection successful");
    }
})

export default connection;