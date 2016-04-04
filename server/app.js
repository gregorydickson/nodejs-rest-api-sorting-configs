var http = require('http');

var URL = require('url');

var configs = [];
var ids = 0;


console.log('server running at http://localhost:8080');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var urlObject = URL.parse(request.url,true);
  var queryStringObject = urlObject.query
  var sort = queryStringObject.sort
  var pagination = queryStringObject.page
  console.log("sort:"+sort);
  console.log("URL: "+url);
  var body = [];
  console.log('checking request method');

  if(request.method === 'GET' && request.url.match(/\/config*/) && sort != null){
    if(sort == "name"){
      configs.sort(sortByProperty("name"));
    } else if(sort == "hostname") {
      configs.sort(sortByProperty("hostname"));
    } else if(sort == "port"){
      configs.sort(sortByProperty("port"));
    } else {
      configs.sort(sortByProperty("username"));
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
      
    response.write(JSON.stringify({configs}));
    response.end();

  //Plain LIST config
  } else if (request.method === 'GET' && request.url === '/config') {

    console.log('URI /config get list');
    
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    response.on('error', function(err) {
      console.error(err);
    });
    
    response.write(JSON.stringify({configs}));
    response.end();
      

  //GET a config
  } else if(request.method === 'GET' && request.url.match(/\/config\/*/)){ 
    
    
    var configId = url.match(/\d{1,5}/);
    var aConfig = null;
    console.log("config doc id:"+configId);
    for(var i=0; i < configs.length; i++){
      if(configs[i].id == configId){
        aConfig = configs[i];
        break;
      }
    }
    
    if(aConfig){
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(aConfig));
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }

    response.on('error', function(err) {
      console.error(err);
    });
      
            
  //CREATE a config
  } else if(request.method === 'POST' && request.url === '/config') {
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();

      var data = JSON.parse(body);
      ids = ids + 1;
      console.log("ids:"+ids);
      data.id = ids;
      configs.push(data);
      var payload = JSON.stringify(data);
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(payload);
      response.end();
    });
  // UPDATE
  } else if(request.method === 'PUT' && request.url.match(/\/config\/*/)){ 

    body = Buffer.concat(body).toString();
    var data = JSON.parse(body);
    var aConfig = null;
    var configId = url.match(/\d{1,5}/);
    for(var i=0; i < configs.length; i++){
        if(configs[i].id == configId){
          aConfig = configs[i];
          data.id = i;
          configs[i] = data;
          break;
        }
    }
    if(aConfig){

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(data));
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }

  } else if(request.method === 'DELETE' && request.url.match(/\/config\/*/)) {
    var configId = url.match(/\d{1,5}/);
    console.log("config doc id:"+configId);
    
    var deleted = false;
    for(var i=0; i < configs.length; i++){
        if(configs[i].id == configId){
          configs.splice(i,1);
          deleted = true;
          break;
        }
    }

    if(deleted){
      response.statusCode = 200;
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

function sortByProperty(property) {
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    }
}

