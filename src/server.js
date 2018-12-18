const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database = require('./database/db');


app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('Server started!');
}); 


app.post('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('body is ',req.body);
    let body = req.body;

    //query 
    if(body.query==true){
        //grab all data
        let data = database.all();

        //filtering is done first since it will reduce the number of data processed later
        if(body.filters){
            data = database.filterData(data,body.filters);
        }

        //sort
        if(body.sort){
            data= database.sortData(data, body.sort);
        }

        //pagination
        if(req.query.pagenumber ){
            data= database.pagination(data, req.query.pagenumber);
        }

        res.send(data);
    }
    //add more data
    else if (body.query==false){
        res.send(database.addData(req.body));
    }
});
