var express = require('express');
var router = express.Router();

var postRegistrationRouter = require('../controllers/registration');

router.get('/', () => {});

router.post(
  '/api/registration',
  postRegistrationRouter.postFunctionRegistration
);

/*router.post('/api/registration', (req, res) => {
  console.log(req.body);
  var newUser = {
    firstName: req.body.firstName,
    id: 1,
    image: '',
    middleName: req.body.middleName,
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    },
    surName: req.body.surName,
    username: req.body.username
  };
});*/

/*var indexRouter = require('../controller/index');
var loginRouter = require('../controller/login');
var adminRouter = require('../controller/admin');

router.get('/', indexRouter.getFunction);
router.post('/', indexRouter.postFunction);

router.get('/login', loginRouter.getFunction);
router.post('/login', loginRouter.postFunction);
router.get('/admin', adminRouter.getFunction);
router.post('/admin/skills', adminRouter.postFunctionForSkills);
router.post('/admin/upload', adminRouter.postFunctionForUploadPicture);*/

module.exports = router;
