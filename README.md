# nodeTest
Test project for Guardium NodeJS assignment

## Setup
* With the latest version of Node installed, run  `npm run install` from the root directory
* To trigger any REST request, use the domain http://localhost:8000 and append query parameter as body 

## REST API
1. Using http://localhost:8000 will return all data

2. To query data, set `query: true` in the body. To append new data, use `query: false`

3. append the sort/ filter json to the body  like the example.

{
	"query": true,
	"filters":[
		{"field": "first_name", "operator": "STARTSWITH", "value": "Sar"},
		{"field": "age", "operator": "GREATER-THAN", "value": 21},
		{"field": "last_name", "operator": "CONTAINS", "value": "Do"}],
	"sort": [{"first_name": "asc", "last_name": "desc", "age": "asc"}] 
}



4. To use pagination, use `pagenumber` in the request:

http://localhost:8000?pagenumber=1

If page number provided is greater than available pages, the first page will be returned.
