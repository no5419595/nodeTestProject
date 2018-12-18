const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const database = require('./database/db');
const EventEmitter = require('events').EventEmitter;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }


//CORS
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('Server started!');
});


//REST API
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let data = database.all();

    console.log('req.query:', req.query);

    //filter
    // if(true){   
    //     let filterjson= [
    //         {"field": "first_name", "operator": "STARTSWITH", "value": "Sar"},
    //         {"field": "age", "operator": "GREATER-THAN", "value": 21},
    //         {"field": "last_name", "operator": "CONTAINS", "value": "Doyle"}
    //     ]
    //     data = database.filterData(data,filterjson);
    //     console.log('data22222?', data);
    // }

    //sorting
    if(true){
        let sortJson=[{"first_name": "asc", "last_name": "desc", "age": "asc"}];
        // let sortJson=[{"first_name": "asc"}];

        data= database.sortData(data, sortJson);
        // console.log('data33?', data);
    }

    //pagination
    if(req.query.pagenumber){
        data= database.pagination(data, req.query.pagenumber);
    }

    res.send(data);

});