const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database = require('./database/db');


app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('Server started!');
}); 


//REST API
// app.get('/', function(req, res) {
//     res.setHeader('Content-Type', 'application/json');

//     //grab all data
//     let data = database.all();

//     //filtering is done first since it will reduce the number of data processed later
//     if(req.query.filters){
//         let filters= req.query.filters.split(',');
//         data = database.filterData(data,filters);
//     }

//     //sort
//     if(req.query.sort){
//         let sorting= req.query.sort.split(',');
//         data= database.sortData(data, sorting);
//     }

//     //pagination
//     if(req.query.pagenumber){
//         data= database.pagination(data, req.query.pagenumber);
//     }

//     res.send(data);

// });

app.post('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('body is ',req.body);
    let body = req.body;

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
    }else if (body.query==add){
        res.send(database.addData(req.body));
        res.send();
    }
});
