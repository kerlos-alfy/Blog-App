const express = require('express');
// const { param, validationResult } = require('express-validator');
const { getArticleValidators } = require('../utils/validators/articleValidator');
const router = express.Router();
const {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { verifyToken, requireRole } = require('../middlewares/verifyToken');
router.route('/').post(verifyToken, requireRole('moderator'), createArticle).get(getAllArticle);
router
  .route('/:id')
  .get(getArticleValidators, getArticleById)
  .patch(verifyToken, requireRole('moderator'), updateArticle)
  .delete(verifyToken, requireRole('admin'), deleteArticle);

module.exports = router;
