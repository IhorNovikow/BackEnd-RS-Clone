const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./authRouter');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = 3000;

const app = express();

const corsOptions = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json())
app.use('/auth', authRouter);
app.patch('auth/users/:username')

async function start() {
	try {
		await mongoose.connect('mongodb+srv://Jafr0:Jafr0228@cluster0.i7uke4d.mongodb.net/mono-rs-clone', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		app.listen(PORT, () => {
			console.log('Server run on Port 3000');
		});
	} catch (e) {
		console.log(e);
	}
}

start();
