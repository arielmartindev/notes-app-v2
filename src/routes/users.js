const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/singin', (req, res) => {
	res.render('users/singin');
});

router.post('/users/singin', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/users/singin',
	failureFlash: true
}));

router.get('/users/singup', (req, res) => {
	res.render('users/singup');
});



router.post('/users/singup', async (req, res) => {
	//console.log(req.body);
	const { name, email, password, confirm_password } = req.body;
	const errors = [];
	if(name.length <=0) {
		errors.push({text:'Debe colocar un nombre'})
	}
	if(password != confirm_password){
		errors.push({text: 'Los passwords no coinciden'});
	}
	if(password.length < 4) {
		errors.push({text: 'El password debe tener al menos 4 caracteres'});
	}
	if(errors.length > 0 ){
		res.render('users/singup',{errors, name, email, password, confirm_password});
	} else {
		const emailUser = await User.findOne({email: email});
		//console.log(emailUser);
		if(emailUser){
			req.flash('errors_msg', 'El email esta ya en uso');
			res.redirect('/users/singup');
		}
		const newUser = new User({name, email, password});
		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();
		req.flash('success_msg', 'Estas registrado!');
		res.redirect('/users/singin');
	}
});

router.get('/users/logout', (req, res) =>{
	req.logout();
	res.redirect('/');
});

module.exports = router;