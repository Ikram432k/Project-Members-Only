var express = require('express');
var router = express.Router();
const AuthUser = require("../controllers/authController");
const User = require("../controllers/userController");
const Message = require("../controllers/messageController");

/* GET home page. */
router.get("/",Message.index);
router.post("/", Message.delete_message_post);

/*********SIGN-UP*********/
router.get('/sign-up',AuthUser.userSign_in_get);
router.post('/sign-up',AuthUser.userSign_in_post);

/*********LOGIN/LOGOUT**********/
router.get("/log-in",AuthUser.userLogin_get);
router.post("/log-in",AuthUser.userLogin_post);

router.get("/log-out",AuthUser.userLogout);

/************MESSAGE***********/
router.get("/createMessage",Message.create_message_get);
router.post("/createMessage",Message.create_message_post);

/************BECOME MEMBER*************/
router.get("/member",User.member_get);
router.post("/member",User.member_post);

/*************BECOME ADMIN*************/
router.get("/admin",User.admin_get);
router.post("/admin",User.admin_post);


module.exports = router;
