const dataFile = require('./data/data.json');
var fs = require('fs');
const pageSize = 10;

module.exports = {


    //return all data 
    all: function(){
        return dataFile;
    },

    //return data only from the page specified
    pagination: function(data, pageNumber){
        if(data.length > pageSize){
            data = data.slice((pageNumber -1) * pageSize, pageNumber * pageSize);
        }
        return data;
    },

    //add more data
    addData: function(data){
        //append id to the new data
        lastData = dataFile[dataFile.length-1];
        data.id= lastData.id +1;
       
        dataFile.push(data);
        fs.writeFile(__dirname+ "/data/data.json", JSON.stringify(dataFile), function (err) {
            if (err) throw 400;
            return 201;
        });
    },

    //filter data
    filterData:function(data, filters){
        console.log('filters:', filters);
        
        let resultSet = [];

        //maximum 3 filtering criterias
        let flength = filters.length >3? 3: filters.length;

        for(let k=0; k < data.length; k++){
            let currentData = data[k];

            let addData = true;
            for(let i = 0; i < flength; i++) {
                var filter = filters[i];        
                if(filter.field=="first_name" || filter.field=="last_name" || filter.field=="email" || filter.field=="gender"){
                    switch(filter.operator) {
                        case "STARTSWITH":
                            if(currentData[filter.field].indexOf(filter.value)!=0){
                                addData=false;
                            }
                            break;
                        case "CONTAINS":
                            if(currentData[filter.field].indexOf(filter.value)==-1){
                                addData=false;
                            }
                          break;
                    }
                }else if (filter.field=="age" || filter.field=="id"){
                    switch(filter.operator) {
                        case "GREAT-THAN":
                            if(currentData[filter.field]<= filter.value){
                                addData=false;
                            }
                            break;
                        case "EQUALS":
                            if(currentData[filter.field]!= filter.value){
                                addData=false;
                            }
                          break;
                        case "LESS-THAN":
                            if(currentData[filter.field]>=filter.value){
                                addData=false;
                            }
                            break;
                    }
                }
            }
            //if all filters satisfy, push to the result
            if(addData){
                resultSet.push(currentData);
            }
        }
        return resultSet;
    },

    //sort
    sortData: function(data, sort){
        let criterias = sort[0];

        //maximum 3 sorting criterias
        if(criterias.length > 3){
            criterias=criterias.slice(0,3);
        }
        for (var field in criterias) {
            console.log("sort by field:" , field, " : " , criterias[field]);

            if(field=="first_name" || field=="last_name" || field=="email" || field=="gender"){
                if(criterias[field]=="asc"){
                    data= data.sort(function(a, b){
                        if(a[field] < b[field]) { return -1; }
                        if(a[field] > b[field]) { return 1; }
                        return 0;
                    });
                }else if(criterias[field]=="desc"){
                    data =data.sort(function(a, b) {return b[field] - a[field]});
                } 
            }else if (field=="age" || field=="id"){       
                if(criterias[field]=="asc"){
                    data =data.sort(function(a, b) {return a[field] - b[field]});
                }else if(criterias[field]=="desc"){
                    data =data.sort(function(a, b) {return b[field] - a[field]});
                }                 
            }
        }
        return data;
    }
}
