const dataFile = require('./data/data.json');
var fs = require('fs');
const pageSize = 10;

module.exports = {

    all: function(){
        return dataFile;
    },

    pagination: function(data, pageNumber){
        if(data.length > pageSize){
            data = data.slice((pageNumber -1) * pageSize, pageNumber * pageSize);
        }
        return data;
    },

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

    filterData:function(data, filters){
        console.log('filters:', filters);
        let resultSet = [];

        for(let k=0; k < data.length; k++){
            let currentData = data[k];
            console.log('currentData:', currentData);

            let addData = true;
            for(let i = 0; i < filters.length; i++) {
                var filter = filters[i];        
                console.log('filter: ', filter);
                if(filter.field=="first_name" || filter.field=="last_name" || filter.field=="email" || filter.field=="gender"){
                    switch(filter.operator) {
                        case "STARTSWITH":
                            console.log('operator: ', filter.operator);
                            if(currentData[filter.field].indexOf(filter.value)!=0){
                                addData=false;
                            }
                            console.log('addData?: ', addData);
                            break;
                        case "CONTAINS":
                            console.log('operator: ', filter.operator);
                            if(currentData[filter.field].indexOf(filter.value)==-1){
                                addData=false;
                            }
                            console.log('addData?: ', addData);
                          break;
                    }
                }else if (filter.field=="age" || filter.field=="id"){
                    switch(filter.operator) {
                        case "GREAT-THAN":
                            console.log('operator: ', filter.operator);
                            if(currentData[filter.field]<= filter.value){
                                addData=false;
                            }
                            console.log('addData?: ', addData);
                            break;
                        case "EQUALS":
                            console.log('operator: ', filter.operator);
                            if(currentData[filter.field]!= filter.value){
                                addData=false;
                            }
                            console.log('addData?: ', addData);
                          break;
                        case "LESS-THAN":
                            console.log('operator: ', filter.operator);
                            if(currentData[filter.field]>=filter.value){
                                addData=false;
                            }
                            console.log('addData?: ', addData);
                            break;
                    }
                }
            }
            if(addData){
                resultSet.push(currentData);
            }
        }
        return resultSet;
    },

    sortData: function(data, sort){
        let criterias = sort[0];
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
