var express = require('express');
var bp = require('body-parser');
var app = express();
var _ = require('underscore');
app.use(bp.json());

var pendingtasks = [
];
var taskid = 1;

app.use(express.static('public'));

app.get('/gettasks', (req,res)=>
{
    res.json(pendingtasks);
});

app.get('/gettasks/:id', (req,res)=>
{
    var newid = parseInt(req.params.id);
    var matched = _.findWhere(pendingtasks,{id:newid})
   /* pendingtasks.forEach(task => {
        if(task.id === newid)
            matched = task;
        
    });*/
    if(matched)
        res.json(matched);
    else
        res.status(404).send();
    
});

app.post('/posttasks', (req,res)=>
{
    var data = req.body;
    data.id = taskid++;
    pendingtasks.push(data);
    res.json(data);
});

app.delete('/delete/:id', (req, res)=>
{
    var newid = parseInt(req.params.id);
    var matched = _.findWhere(pendingtasks,{id:newid})
    if(matched){
        pendingtasks = _.without(pendingtasks, matched);
        res.json(pendingtasks);
    }
    else
        res.status(404).json({"error":"id not found"})
})

app.listen(3000, ()=>
{
    console.log('server is started');
});