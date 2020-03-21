const db = require("../models");
const asyncPromiseMiddleware = require('../utils/user.asyncMiddleware');
const User = db.user;
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

exports.addUser = async (req, res) => {
  	res.render('adduser', { 'title': 'Add a new User' });
};

exports.createNewUser = asyncPromiseMiddleware (async (req, res, next) => {

	let userInfo = {
		fname: req.body.fname,
		lname: req.body.lname,
		dob: req.body.dob
	};

    await User.create(userInfo);
    res.redirect('/users');
});

/*exports.createNewUser = async (req, res) => {

	const user = {
		fname: req.body.fname,
		lname: req.body.lname,
		dob: req.body.dob
	};

	User.create(user).then(data => {
    	res.redirect('/users');
    }).then(data => {
    	console.log(data);
	}).catch(err => {
    	res.status(500).send({
	        message:
	        err.message || "Some error occurred while creating the User."
		});
	});
};*/

exports.showAllUsers = asyncPromiseMiddleware (async (req, res, next) => {

    const findAll = await User.findAll();
    res.render('user-list', { 'title': 'User List', 'userList': findAll, 'moment': moment });
});

/*exports.showAllUsers = async (req, res) => {

	User.findAll().then(data => {

	  	var userList = [];
	  	_.forEach(data, function(element, i) { 
	  		var user = {
				'id': element.id,
				'fname': element.fname,
				'lname': element.lname,
				'dob': element.dob,
			}
			userList.push(user);
	  	});

	  	res.render('user-list', { 'title': 'User List', 'userList': userList, 'moment': moment });
	}).catch(err => {
		res.status(500).send({
	    	message:
	      	err.message || "Some error occurred while retrieving users."
	  	});
	});
};*/

exports.editUser = asyncPromiseMiddleware (async (req, res, next) => {

	const id = req.params.userId;

	const findByPk = await User.findByPk(id);
    res.render('edituser', { 'title': 'Edit user', 'userInfo': findByPk, 'moment': moment });
});

/*exports.editUser = async (req, res) => {
	const id = req.params.userId;

	User.findByPk(id).then(data => {
    	res.render('edituser', { 'title': 'Edit user', 'userInfo': data, 'moment': moment });
    }).catch(err => {
    	res.status(500).send({
        	message: "Error retrieving User with id=" + id
      	});
    });
};*/

exports.updateUser = asyncPromiseMiddleware (async (req, res, next) => {

	let userId = req.params.userId;
	let num = await User.update(req.body, {
		where: { id: userId }
	});

	if (num == 1) {
    	res.redirect('/users');
	}else{
		res.send({
		  message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
		});
	}
});

/*exports.updateUser = async (req, res) => {

	const id = req.params.userId;

	User.update(req.body, {
		where: { id: id }
	}).then(num => {
		if (num == 1) {
			res.redirect('/users');
		} else {
			res.send({
			  message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
			});
		}
	}).catch(err => {
		res.status(500).send({
	    	message: "Error updating User with id=" + id
	  	});
	});
};*/

exports.deleteUser = asyncPromiseMiddleware (async (req, res, next) => {

	let userId = req.params.userId;

	let num = await User.destroy({
		where: { id: userId }
	});
	if(num==1){
    	res.redirect('/users');
	}
    else{
    	res.send({
			message: `Cannot delete User with id=${id}. Maybe User was not found!`
		});
    }
});

/*exports.deleteUser = async (req, res) => {

	const id = req.params.userId;

	User.destroy({
		where: { id: id }
	}).then(num => {
		if (num == 1) {
			res.redirect('/users');
		} else {
			res.send({
				message: `Cannot delete User with id=${id}. Maybe User was not found!`
			});
		}
	}).catch(err => {
		res.status(500).send({
	    	message: "Could not delete User with id=" + id
	  	});
	});
};*/