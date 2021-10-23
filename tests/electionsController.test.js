const electionsController = require('../controllers/electionsController');

it('Should found Belarus code', () => {
	const expectedResult = 'BY';
	const result = electionsController.requestCountry('46.182.48.0');
	if (result !== expectedResult) {
		throw new Error(
			`Expected ${expectedResult}, but got ${result}`,
		);
	}
});
