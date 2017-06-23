var exp=require("express");
var app=exp();

function register_get_handler(req,resp) {
	resp.status(200);
	resp.json({status:"Received the registration"});
	console.log("======= Registration ========");
	console.log(req.query.record);
	console.log("=============================\n");
}

app.get("/register",register_get_handler);
app.use("/libs",exp.static(__dirname+"/bower_components"));
app.use(exp.static(__dirname+"/public"));
var port=parseInt(process.argv[2]) || parseInt(process.env.SERV_PORT) || 3000
app.listen(port,()=>console.log("Ready on port "+port))
