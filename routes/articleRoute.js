const express = require('express');
const router = express.Router();
const {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { verifyToken, requireRole } = require('../middlewares/verifyToken');
router
  .route('/')
  .post(verifyToken, requireRole('moderator'), createArticle)
  .get(getAllArticle);
router
  .route('/:id')
  .get(getArticleById)
  .patch(verifyToken, requireRole('moderator'), updateArticle)
  .delete(verifyToken, requireRole('admin'), deleteArticle);

module.exports = router;
