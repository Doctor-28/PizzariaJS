const Sequelize = require('sequelize');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');
const {
	Franchise
} = require('./franchise');
const {
	Purchase
} = require('./purchase');

const User = sequelize.define('user', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	userType: {
		type: Sequelize.ENUM('admin', 'owner', 'simple'),
		allowNull: false,
		field: 'user_type'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

User.hasMany(Purchase, {
	foreignKey: 'userId',
	sourceKey: 'id'
});
Purchase.belongsTo(User, {
	foreignKey: 'userId',
	targetKey: 'id'
});

User.hasMany(Franchise, {
	foreignKey: 'userId',
	sourceKey: 'id'
});
Franchise.belongsTo(User, {
	foreignKey: 'userId',
	targetKey: 'id'
});

let validateUser = (user) => {
	const schema = {
		name: Joi.string().min(5).max(125).required(),
		email: Joi.string().min(6).max(50).email().required(),
		userType: Joi.string().min(5).max(6).required(),
		password: Joi.string().min(8).max(32).required()
	};
	return Joi.validate(user, schema);
};

let generateAuthToken = (user) => {
	const token = jwt.sign({
		id: user.id,
		userType: user.userType
	}, config.get('jwtPrivateKey'));
	return token;
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.generateAuthToken = generateAuthToken;