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

    // sortData: function(data, sort){
    //     for(let i=0; i < sort.length; i++){
    //         let field = sort[i].split('|');
    //         console.log("sort by field:" , field);
            
    //         if(field[0]=="first_name" || field[0]=="last_name" || field[0]=="email" || field[0]=="gender"){
    //             if(field[1]=="asc"){
    //                 data= data.sort(function(a, b){
    //                     if(a[field[0]] < b[field[0]]) { return -1; }
    //                     if(a[field[0]] > b[field[0]]) { return 1; }
    //                     return 0;
    //                 });
    //             }else if(field[1]=="desc"){
    //                 data= data.sort(function(a, b){
    //                     if(a[field[0]] > b[field[0]]) { return -1; }
    //                     if(a[field[0]] < b[field[0]]) { return 1; }
    //                     return 0;
    //                 });
    //             } 
    //         }else if (field[0]=="age" || field[0]=="id"){       
    //             if(field[1]=="asc"){
    //                 data =data.sort(function(a, b) {return a[field[0]] - b[field[0]]});
    //             }else if(field[1]=="desc"){
    //                 data =data.sort(function(a, b) {return b[field[0]] - a[field[0]]});
    //             }                 
    //         }
    //     }
    //     return data;
    // },

    // filterData:function(data, filters){
    //     console.log('filters:', filters);
    //     let resultSet = [];

    //     for(let k=0; k < data.length; k++){
    //         let currentData = data[k];
    //         console.log('currentData:', currentData);

    //         let addData = true;
    //         for(let i = 0; i < filters.length; i++) {
    //             var filter = filters[i];        
    //             console.log('filter: ', filter);
    //             filter= filter.split('|');
    //             console.log('splitted filter: ', filter);
    //             if(filter[0]=="first_name" || filter[0]=="last_name" || filter[0]=="email" || filter[0]=="gender"){
    //                 switch(filter[1]) {
    //                     case "STARTSWITH":
    //                         console.log('operator: ', filter[1]);
    //                         if(currentData[filter[0]].indexOf(filter[2])!=0){
    //                             addData=false;
    //                         }
    //                         console.log('addData?: ', addData);
    //                         break;
    //                     case "CONTAINS":
    //                     console.log('operator: ', filter[1]);
    //                     if(currentData[filter[0]].indexOf(filter[2])==-1){
    //                             addData=false;
    //                         }
    //                         console.log('addData?: ', addData);
    //                       break;
    //                 }
    //             }else if (filter[0]=="age" || filter[0]=="id"){
    //                 switch(filter.operator) {
    //                     case "GREAT-THAN":
    //                         console.log('operator: ', filter[1]);
    //                         if(currentData[filter[0]]<= filter[2]){
    //                             addData=false;
    //                         }
    //                         console.log('addData?: ', addData);
    //                         break;
    //                     case "EQUALS":
    //                         console.log('operator: ', filter[1]);
    //                         if(currentData[filter[0]]!= filter[2]){
    //                             addData=false;
    //                         }
    //                         console.log('addData?: ', addData);
    //                       break;
    //                     case "LESS-THAN":
    //                         console.log('operator: ', filter[1]);
    //                         if(currentData[filter[0]]>=filter[2]){
    //                             addData=false;
    //                         }
    //                         console.log('addData?: ', addData);
    //                         break;
    //                 }
    //             }
    //         }
    //         if(addData){
    //             resultSet.push(currentData);
    //         }
    //     }
    //     return resultSet;
    // }

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
