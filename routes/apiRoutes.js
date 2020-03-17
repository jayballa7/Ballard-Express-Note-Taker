// const apiRoutes = require('express').Router();
// const fs = require('fs');

// apiRoutes.get('/api/notes',(req,res)=>{
    
//     fs.readFile('../model/db.json','utf8', function(err,data){
//         if(err){
//             throw err;
//         }
//         console.log("Received response");
        
//         const result=res.json(JSON.parse(data));
// })
// console.log(res);
// })


// router.get('notes', function(req, res) {
//     fs.readFile('notes','utf8', function(err,data){
//         if(err){
//             throw err;
//         }
//         const result=res.json(JSON.parse(data)); 
//         console.log(result);
// })
// })

// router.get('notes', function(req,res) {
//     notes.getAllNotes()
//     .then(function(notes) {
//         res.json(notes);
//     })
// })

module.exports = apiRoutes;