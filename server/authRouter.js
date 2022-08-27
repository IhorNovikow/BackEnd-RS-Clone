const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');

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

module.exports = router;
