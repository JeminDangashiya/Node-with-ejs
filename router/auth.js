var router = require('express').Router();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer')
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
router.get("/", function (req, res) {
    res.send('<a href="/Login">login</a><a href="/register">Register</a>');
})
router.get('/login', function (req, res) {
    res.render('login');
})
router.get('/register', function (req, res) {
    res.render('register');
})
router.get('/forgetpassword', function (req, res) {
    res.render('forgetpassword');
})
router.get('/verifyOtp', function (req, res) {
    res.render('verifyOtp');
})
router.get('/resetpassword', function (req, res) {
    res.render('resetpassword');
})
router.post("/registeruser", urlencodedParser, (req, res) => {
    if (!req.body.Name) {
        res.status(200).json({
            success: false,
            message: "Please enter proper name",
        });
        return
    } else if (!req.body.Email) {
        res.status(200).json({
            success: false,
            message: "Please enter proper Email Address",
        });
        return
    } else if (!req.body.Password) {
        res.status(200).json({
            success: false,
            message: "Please enter Password",
        });
        return
    } else if (req.body.Password != req.body.ConfirmPassword) {
        res.status(200).json({
            success: false,
            message: "Please enter confirm Password",
        });
        return
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(decodeURIComponent(req.body.Email))) {
        res.status(200).json({
            success: false,
            message: "Please enter Proper email",
        });
        return
    }
    var senderEmail = "dilip.kakadiya.test@gmail.com"
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: 'Dilip@123'
        }
    });

    var mailOptions = {
        from: senderEmail,
        to: decodeURIComponent(req.body.Email),
        subject: 'Sending Email using Node.js',
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(200).json({
                success: false,
                message: "Failed to Register user",
                data: res.body,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Registration successful",
                data: res.body,
            });
        }
    });
});

router.post("/loginuser", urlencodedParser, (req, res) => {
    if (!req.body.mail) {
        res.status(200).json({
            success: false,
            message: "Please enter proper Email Address",
        });
        return
    } else if (!req.body.password) {
        res.status(200).json({
            success: false,
            message: "Please enter Password",
        });
        return
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(decodeURIComponent(req.body.mail))) {
        res.status(200).json({
            success: false,
            message: "Please enter Proper email",
        });
        return
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: res.body,
    });
});


router.post("/forgetpassword", urlencodedParser, (req, res) => {
    if (!req.body.mail) {
        res.status(200).json({
            success: false,
            message: "Please enter proper Email Address",
        });
        return
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(decodeURIComponent(req.body.mail))) {
        res.status(200).json({
            success: false,
            message: "Please enter Proper email",
        });
        return
    }
    var senderEmail = "dilip.kakadiya.test@gmail.com"
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: 'Dilip@123'
        }
    });

    var mailOptions = {
        from: senderEmail,
        to: decodeURIComponent(req.body.mail),
        subject: 'OTP for reset password',
        html: 'Your otp is 987654, please reset your password <a href="http://localhost:8080/verifyOtp">here</a>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(200).json({
                success: false,
                message: JSON.stringify(error),
                data: res.body,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Email successfuly send",
                data: res.body,
            });
        }
    });
});

router.post("/verifyOtpCode", urlencodedParser, (req, res) => {
    if (req.body.optCode == '987654') {
        res.status(200).json({
            success: true,
            message: "Otp verified",
            data: res.body,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Your otp is not valid",
            data: res.body,
        });
    }
})


module.exports = router