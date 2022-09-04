const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const User = require('./models/User');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(express.json())


router.post(
	'/registration',
	[
		check('username', 'Имя пользователья не может быть пустым').notEmpty(),
		check('password', 'Пароль должен быть от 4 до 10 символов').isLength({ min: 4, max: 10 }),
	],
	controller.registration
);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

router.put(`/users/:username/`, async function getUser(req, res) {
	try {
		const user = await User.updateOne(
			{ "username": req.params.username }, // Filter
			{ $set: { 'score': req.body.score } }, // Update
		)
		res.json(user);
	} catch (e) {
		console.log(e)
	}
});


module.exports = router;
