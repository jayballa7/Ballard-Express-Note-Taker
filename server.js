const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hRoute = require('./routes/htmlroutes');

//calls routes
app.use(express.static("public"));
app.use('/', hRoute);

//displays Notes
app.get('/api/notes', (req,res) => {
    if(fs.existsSync('./model/db.json')) {
        fs.readFile('./model/db.json', 'utf8', function(err, data) {
            if(err) {
                throw err;
            }
            let noteData = JSON.parse(data);
            res.send(noteData);
        })
    } else {
        console.log ("No notes saved");
    }
});

//create new Note
app.post('/api/notes', (req, res) => {
    let noteNew = req.body;

    if(fs.existsSync('./model/db.json')) {
        fs.readFile('./model/db.json', 'utf8', (err, data) => {
            if (err){
                console.log(err);
        } else {

            obj = JSON.parse(data);
            obj.push(noteNew);

        fs.writeFile('./model/db.json', JSON.stringify(obj), 'utf8', (err) => {
            if(err) {
                throw err;
            }
            console.log('Note saved.')
        });
        }});
    } else {
        obj = [];
        obj.push(noteNew);
        fs.writeFile('./model/db.json', JSON.stringify(obj), 'utf8', (err) => {
            if(err) {
                throw err;
            }
            console.log('Note saved.')
        });
    }
});




app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});