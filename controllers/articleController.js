const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');
const ApiError = require('../utils/apiError');
// @desc    Create Article
// @route   POST  /api/v1/articles
// @access  Public
exports.createArticle = asyncHandler(async (req, res) => {
  const createdBy = req.user.id;
  const { title, content, author, tags, published } = req.body;
  const article = await new Article({
    title,
    content,
    author,
    tags,
    published,
    createdBy: createdBy,
  });

  article.save();
  res.status(200).json(article);
});

// @desc    Get All Articles
// @route   GET  /api/v1/articles
// @access  Public
exports.getAllArticle = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  const articles = await Article.find({}).skip(skip).limit(limit);
  res.json({ results: articles.length, page, data: articles });
});

// @desc    Get Article By ID
// @route   GET  /api/v1/articles/:id
// @access  Public
exports.getArticleById = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).populate({ path: 'createdBy', select: 'name' });
  if (!article) {
    return next(new ApiError('Article not found', 404));
  }
  res.status(200).json({ data: article });
});

// @desc    Update Article By ID
// @route   PATCH  /api/v1/articles/:id
// @access  Public
exports.updateArticle = asyncHandler(async (req, res, next) => {
  const { title, content, author, tags, published } = req.body;

  const article = await Article.findByIdAndUpdate(
    req.params.id,
    { title, content, author, tags, published },
    { new: true }
  );
  if (!article) {
    return next(new ApiError('Article not found', 404));
  }
  res.json({ data: article });
});

// @desc    Delete Article By ID
// @route   DELETE  /api/v1/articles/:id
// @access  Public
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return next(new ApiError('Article not found', 404));
  }
  res.json({ Deleted: article });
});
