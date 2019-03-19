const router = require('express').Router();
const FlavorService = require('../services/flavorService');
const { CREATED, OK } = require('../utils/statusCodes');

router.get('/:id', async (req, res) => {
	try {
		const flavor = await FlavorService.getFlavorById(req.params.id);
		res.send(flavor);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/franchise/:id', async (req, res) => {
	try {
		const flavors = await FlavorService.getFlavorsFromFranchise(req.params.id);
		res.send(flavors);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/ingredient/:id', async (req, res) => {
	try {
		const ingredients = await FlavorService.getIngredientsFromFlavor(req.params.id);
		res.send(ingredients);
	} catch (error) {		
		res.status(error.status);
		res.send(error.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const flavor = await FlavorService.createFlavor(req.body);
		res.status(CREATED);
		res.send(flavor);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const flavor = await FlavorService.updateFlavor(req.params.id, req.body);
		res.status(OK);
		res.send(flavor);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const flavor = await FlavorService.deleteFlavor(req.params.id);
		res.send(flavor);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;