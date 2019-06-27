var express = require('express');

var app = express();
const PORT = process.env.PORT || 3000;
const backend_host = process.env.backendHostName || "http://localhost:5000"

console.log("Backend HostName: "+ backend_host);
console.log("PORT: "+ PORT);

var proxy = require('http-proxy-middleware');
app.use('/question', proxy({
    target: backend_host, changeOrigin: true, onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('Authorization', 'Bearer dummy_auth_token')
    }
}));

app.get('/', function(req, res){
	app.use('/', express.static(__dirname + "/public"));
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function(){
    console.log(`Listen on port ${PORT}...`);
});