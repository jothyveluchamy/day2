
var cluster = require('cluster');



if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
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
        console.log('Process ' + process.pid);
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
        
        console.log('Process ' + process.pid);
        
    });

    app.post('/posttasks', (req,res)=>
    {
        var data = req.body;
        data.id = taskid++;
        pendingtasks.push(data);
        res.json(data);

        console.log('Process ' + process.pid);
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
            res.status(404).json({"error":"id not found"});

        console.log('Process ' + process.pid);
    });


    app.listen(3000, ()=>
    {
        console.log('server is started');
    });

}
