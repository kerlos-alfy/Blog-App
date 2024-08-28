const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware1');

exports.getArticleValidators = [check('id').isMongoId().withMessage('Is Invalid Id'), validatorMiddleware];
