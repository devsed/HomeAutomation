const express = require("express");
const bodyParser = require("body-parser");
const smaRouter = require("./routes/smaRouter");
const mongoose = require("mongoose");
const userModel = require("./models/users")
const bcrypt = require("bcrypt-nodejs")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

let app = express();

app.use(bodyParser.json());

// user databases
// 
mongoose.connect("mongodb://localhost/smarthome").then(
    () => {console.log("Connection to mongoDB successful")},
    (error) => {console.log("Connection to mongoDB failed : "+error)}
);

app.use(session({
	name:"smarthome-id",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
	store: new MongoStore({
			collection:"session",
			url:"mongodb://localhost/smarthomesession",
			ttl:24*60*60
	})
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done) {
	console.log("serializeUser:"+user.username);
	done(null,user._id);
});

passport.deserializeUser(function(id,done) {
	console.log("deserializeUser");
	userModel.findById(id,function(err, user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false);
		}
		return done(null,user);
	});	
});

passport.use("local-login", new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done){
	if(!req.body.username || !req.body.password) {
		return done(null,false,"Wrong credentials");
	}
	if(req.body.username.length === 0 || req.body.password.length ===0 ) {
		return done(null,false,"Wrong credentials");
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err){
			return done(err);
		}
		if(!user) {
			return done(null,false,"Wrong credentials");
		}
		if(isPasswordValid(password,user.password)) {
			let token = createToken();
			req.session.token = token;
			req.session.username= username;
			return done(null,user)
		}
		return done(null,false,"Wrong credentials");
	});
}));

function createSaltedPassword(pw) {
	return bcrypt.hashSync(pw,bcrypt.genSaltSync(8),null);
}

function isPasswordValid(pw,hash) {
	return bcrypt.compareSync(pw,hash);
}

app.post("/login",
passport.authenticate("local-login",{failureRedirect:"/"}),function(req,res) {
	return res.status(200).json({"token":req.session.token})
});

app.post("/logout", function(req,res) {
	if(req.session) {
		req.session.destroy();
	}
	res.status(200).json({"message":"logged out"});
});

app.post("/register", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({"message":"provide credentials"})
	}
	if(req.body.username.length ===0 || req.body.password.length ===0) {
		return res.status(409).json({"message":"provide credentials"})		
	}
	let user = new userModel({
		"username":req.body.username,
		"password":createSaltedPassword(req.body.password)
	})
	user.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"username already in use"})
		}
		return res.status(200).json({"message":"success"})
	})
});

function isUserLogged(req,res,next) {
	let token = req.headers.token;
	if(req.isAuthenticated()) {
		return next();
	}
	res.status(403).json({"message":"not allowed"});
}

function createToken() {
	let token = "";
	let letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<1024;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token+letters[temp]
	}
	return token;
}

app.use("/api", isUserLogged, smaRouter);

app.listen(3001);
console.log("Running in port 3001");
