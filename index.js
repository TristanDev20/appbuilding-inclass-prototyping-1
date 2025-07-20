const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const blogPostRoutes = require('./routes/blogpost');


const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
	origin: [
		'http://localhost:3000', 
		'http://localhost:4000',
		'https://appbuilding-inclass-prototyping-2.vercel.app' 
	],
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));



// mongoose.connect(process.env.MONGO_STRING)

mongoose.connect("mongodb+srv://admin123:admin123@b546.8yotent.mongodb.net/BlogApplication");
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.use("/users", userRoutes);
app.use("/blogposts", blogPostRoutes);



if(require.main === module){
    app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = {app, mongoose};