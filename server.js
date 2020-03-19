const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 3030;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hRoute = require('./routes/htmlroutes');

//calls routes
app.use(express.static("public"));
app.use('/', hRoute);

//displays Notes
app.get('/api/notes', (req,res) => {

        fs.readFile('./model/db.json', 'utf8', function(err, data) {
            let noteData = [];
            if(err) {
                throw err;
            }
            if(data.length > 2) {
                noteData = JSON.parse(data);
                res.send(noteData);
            }
            else {
                console.log('No notes saved');
            }
        })   
});


//create new Note
app.post('/api/notes', (req, res) => {

    let noteNew = req.body;

        fs.readFile('./model/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(`err at the database ${err}`);
            } 
            
            else if (data.length > 2) {
                obj = JSON.parse(data);
                obj.push(noteNew);

                fs.writeFile('./model/db.json', JSON.stringify(obj), 'utf8', (err) => {
                    if(err) {
                        throw err;
                    }
                    console.log('Note saved.')
                });
           }
            else {
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
});

//delete Note
app.delete('/api/notes/:id', (req,res) => {
    fs.readFile("./model/db.json",'utf8', (err,data) => {
        if(err) {
             throw err;
        }
        let objNew=JSON.parse(data);
        for(let i = 0; i < objNew.length; i++){
            if(req.params.id == objNew[i].id) {
                objNew.splice(i,1);
            }
            else{
                console.log("Id does not match")
            }
        }
        const output = fs.writeFile('./model/db.json',JSON.stringify(objNew),(err) => {
            if(err){
                throw err;
            }
            console.log("Note rewritten");
        })
        res.send(output);
    })
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});

