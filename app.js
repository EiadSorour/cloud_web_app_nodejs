const express = require("express");
const { Sequelize } = require('sequelize');

const app = express();

const sequelize = new Sequelize('Student_Data', 'postgres', 'eiad1422003', {
    host: "localhost",
    dialect: "postgres",
    port: 5432
});

sequelize.authenticate()
    .then(()=>{
        console.log("Connected to postgres database");
    })
    .catch((error)=>{
        console.log(error);
    })

app.get("/" , (req,res)=>{
    res.send("<h1>Hello from express</h1>");
});

app.listen(3000 , ()=>{
    console.log("Server on port 3000");
});