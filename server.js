const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());

var corsOption = {
	origin:"http://localhost:4200",
	optionSuccessStatus:200
}
app.use(cors(corsOption));
const muser=require('./model/muser').user;
const mchat=require('./model/mchat').chat;

mongoose.connect('mongodb://localhost:27017/student',{useNewUrlParser:true});
 
 app.listen(3000,() => {
 	console.log('server started!!!');
 });
 app.post('/api/createuser',(req,res) => {
 	console.log("Entered Create_User");
 	console.log(req.body);
 	console.log(req);

 	const newUser = new muser();
 	newUser.userName=req.body.userName;
 	newUser.email=req.body.email;
 	newUser.password=req.body.password;
 	newUser.age=req.body.age;
 	newUser.save((err) => {
 		if(err)
 			res.status(500).json(err);
 		else
 			res.status(200).json(newUser);
 	});
 });

app.post("/api/do_login", (req, res)=>{
	muser.findOne({email:req.body.email, password: req.body.password},
		{_id:1,userName:1},
		(err, doc)=>{
		if(err)
			res.status(500).json(err);
		else if(doc)
			res.status(200).json(doc);
		else
			res.status(401).json({msg:"Invalid login details"});

	});
});

app.post('/api/post_new_chat', (req, res)=>{
	
	console.log("inside post_new_chat!!!!!!!!!!!!!!!!!1");
	console.log(req.body);

	const newChat = new mchat();
	newChat.userName = req.body.userName;
	newChat.userID = req.body.userID;
	newChat.msg = req.body.msg;

	newChat.save((err)=>{
		if(err)
			res.status(500).json(err);
		else
			res.status(200).json(newChat);
	})
});

app.get("/api/get_chats", (req, res)=>{
	mchat.find({},
		{userName:1,msg:1,crAt:1},
		{sort:{crAt: -1}},
		(err, docs)=>{
		if(err)
			res.status(500).json(err);
		else if(docs)
			res.status(200).json(docs);

	});
});
