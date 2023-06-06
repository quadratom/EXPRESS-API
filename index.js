const  Joi = require("joi");
// const validator = require('express-joi-validation').createValidator({})
const express = require("express");


const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());

const courses =  [
    { id: 1 , name: 'course1'},
    { id: 2 , name: 'course2'},
    { id: 3 , name: 'course3'}
];

app.get('/', (req,res) => {
    res.send("welcome express")
});

app.get('/api/post/:month/:year', (req,res) => {
    res.send(req.query)
});

//  HANDLING GET REQUEST...

app.get('/api/courses', (req,res) => {
    res.send(courses)
});

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course with given ID was not Found...');
    res.send(course);
});

//  HANDLING POST REQUEST...
app.post('/api/courses', (req,res) => {
    
const { error } = validateCourse(req.body);
if(error) return
    //  400 Bad Request..
    res.status(400).send(error.details[0].message);


   
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//  Handling put request...
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {res.status(404).send('The course with given ID was not Found...');
    return;
    };
const { error } = validateCourse(req.body);
if(error) {
    //  400 Bad Request..
    res.status(400).send(error.details[0].message);
    return;
}

course.name = req.body.name;
res.send(course);

});

//  Handling Delete request...
app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given ID was not Found...');

//    Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(course, schema);

}



app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})


