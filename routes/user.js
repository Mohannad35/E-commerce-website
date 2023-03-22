const { Router } = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/admin.js');
const validate = require('../middleware/validateReq.js');
const Validator = require('../middleware/validator.js');
const UserController = require('../controller/user.js');
const validateObjectId = require('../middleware/validateObjectId.js');
const router = Router();

// refresh auth token
router.get('/refresh-jwt', [auth], UserController.refreshToken);

// show all users (will check later that the user has admin permissions)
router.get('/', [auth, isAdmin, validate('query', Validator.getUsers)], UserController.users);

router.get('/stats', [auth, isAdmin, validate('query', Validator.getStats)], UserController.stats);

router.delete('/', [auth, isAdmin, validate('body', Validator.id)], UserController.deleteUser);

router.post('/ban', [auth, isAdmin, validate('body', Validator.id)], UserController.banUser);

// signup
router.post('/signup', [validate('body', Validator.signup)], UserController.signup);

// verify
router.get('/verify', [validate('query', Validator.token)], UserController.verify);

// resend verification email
router.get('/resend-verify', [auth], UserController.resend);

// resend verification email
router.post('/forget-password', [validate('body', Validator.email)], UserController.forgetPassword);

// resend verification email
router.get(
	'/forget-password',
	[validate('query', Validator.token)],
	UserController.redirectForgetPassword
);

// login
router.post('/login', [validate('body', Validator.login)], UserController.login);

// edit user information
router.post('/me', [auth, validate('body', Validator.userInfo)], UserController.editInfo);

// vendor request
router.post(
	'/vendor-req',
	[auth, validate('body', Validator.vendorReq)],
	UserController.vendorRequest
);

// get vendor requests
router.get('/vendor-req', [auth, isAdmin], UserController.getVendorRequests);

// change user password
router.post(
	'/me/changePassword',
	[auth, validate('body', Validator.password)],
	UserController.changePassword
);

// change user account type
router.post(
	'/changeAccountType/:id',
	[auth, isAdmin, validateObjectId, validate('body', Validator.accountType)],
	UserController.changeAccountType
);

module.exports = router;
