const router = require('express').Router();
const IngredientService = require('../services/ingredientService');
const {
	CREATED,
	OK
} = require('../utils/statusCodes');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');

router.get('/:id', [auth], async (req, res) => {
	try {
		const ingredient = await IngredientService.getIngredientById(req.params.id);
		res.send(ingredient);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.post('/', [auth, owner], async (req, res) => {
	try {
		const ingredient = await IngredientService.createIngredient(req.body);
		res.status(CREATED);
		res.send(ingredient);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', [auth, owner], async (req, res) => {
	try {
		const ingredient = await IngredientService.updateIngredient(req.params.id, req.body);
		res.status(OK);
		res.send(ingredient);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', [auth, owner], async (req, res) => {
	try {
		const ingredient = await IngredientService.deleteIngredient(req.params.id);
		res.send(ingredient);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;