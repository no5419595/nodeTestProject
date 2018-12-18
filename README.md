# nodeTest
Test project for Guardium NodeJS assignment

## Setup
* With the latest version of Node installed, run  `npm run install` from the root directory
* To trigger any REST request, use the domain http://localhost:8000 and append additional query parameters via postman 

## REST API
1. Using http://localhost:8000 will return all data

2. To use filtering, use `<criteria>|<operand>|<value>` Here is an example:

http://localhost:8000?filters=first_name|STARTSWITH|Sar,last_name|CONTAINS|Do,age|GREATER-THAN|21

The above filtering query is equivalent to the following:
 [
     {"field": "first_name", "operator": "STARTSWITH", "value": "Sar"},
     
     {"field": "age", "operator": "GREATER-THAN", "value": 21},
     
     {"field": "last_name", "operator": "CONTAINS", "value": "Doyle"} 
 ] 
        


3.  To use sorting, use `<criteria>|<asc/desc>` Here is an example:

 http://localhost:8000?sort=first_name|asc,last_name|desc,age|asc

The above filtering query is equivalent to the following:

 [
 
 {"first_name": "asc", "last_name": "desc", "age": "asc"}
 
 ];



4. To use pagination, use `pagenumber` in the request:

http://localhost:8000?pagenumber=1

If page number provided is greater than available pages, the first page will be returned.
