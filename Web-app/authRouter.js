const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require("express-validator");
const authMiddleware = require('./middleware/authMiddleware');

router.post('/regisrtation',[
    check('username',"Username field is empty").notEmpty(),
    check('password',"Password must be 4..8 symbols").isLength({min:4, max:8})
],controller.registration);
router.post('/new',[
    check('text',"Text field is empty").notEmpty(),
    check('date',"Date field is empty").notEmpty(),
    check('time',"Time field is empty").notEmpty(),
],authMiddleware,controller.addPost);
router.post('/',controller.login);
router.get('/',authMiddleware,controller.getLogin);
router.get('/regisrtation',controller.getReg);
router.get('/index',authMiddleware,controller.getIndex);
router.get('/new',authMiddleware,controller.getNew);
router.get('/logout',controller.logOut);
router.get('/contacts',authMiddleware,controller.getContacts);
router.get('/about',authMiddleware,controller.getAbout);
router.delete('/index/:id',authMiddleware,controller.deletePost);


module.exports = router;