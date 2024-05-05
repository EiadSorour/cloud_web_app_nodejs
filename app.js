// Import required modules
const express = require("express");
const { Sequelize,DataTypes } = require('sequelize');

// Create new express app
const app = express();

// Students data to be saved in the database
const students_data = [
    {
        id: 2203176,
        name: "Eiad Sorour",
        age: 21,
        cgpa: 3.8
    },
    {
        id: 2203175,
        name: "Hazem Ahmed",
        age: 21,
        cgpa: 4
    },
    {
        id: 2203173,
        name: "Ahmed Mohamed",
        age: 20,
        cgpa: 3.5
    },
]

// Define connection parameters to sequelize ORM
const sequelize = new Sequelize('Student_Data', 'postgres', 'eiad1422003', {
    host: "localhost",
    dialect: "postgres",
    port: 5432
});

// Connect to the "Student_Data" postgres database with sequelize ORM
sequelize.authenticate()
    .then(()=>{
        console.log("Connected to postgres database");
    })
    .catch((error)=>{
        console.log(error);
    })

// Define 'Students' table schema
const Student = sequelize.define('Student',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cgpa: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
);

// Create "Students" table in the database
Student.sync()

// Check if students data already saved in database
const find_students_promise = Student.findAll()
    .then((saved_students_data)=>{
        // Insert all students data in the "Students" table in database if not saved already
        if(saved_students_data.length === 0){
            students_data.forEach( async (student) => {
                await Student.create(student)
            });
        }  
    });  

// Define routes (End points) 
app.get("/api/student" , async (req,res)=>{
    const allStudents = await Student.findAll();
    res.send(allStudents);
});

// Make app listen to requests through port 3000
app.listen(3000 , ()=>{
    console.log("Server on port 3000");
}); 