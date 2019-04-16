var http=require("http");
var obj={
login:"andry",
age:20
};
//var app=connect().use(connect.static('public')).listen(3000,"0.0.0.0");
http.createServer(function(request,response){
	console.log("Url"+request.url);
	console.log("Тип запроса"+request.method);
	console.log("User-Agent:"+request.headers["user-agent"]);
	console.log("Все заголовки");
	console.log(request.headers);
	response.setHeader("Content-type","application/json");
	response.write("<h2>Hello world</h2>");
	response.end(JSON.stringify(obj));
}).listen(3000,"0.0.0.0",function(){console.log("Server started!")});
