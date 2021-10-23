const electionsController = require('../controllers/electionsController')

it('should found Belarus code', function () {
  const expectedResult = 'BY'
  const result = electionsController.requestCountry('46.216.248.116')
  if (result !== expectedResult) {
    throw new Error(
            `Expected ${expectedResult}, but got ${result}`
    )
  }
})

