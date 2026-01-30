const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { WellnessContent, User } = require('../models');

// @desc    Get all wellness content
// @route   GET /api/wellness
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { type } = req.query;
        const whereClause = type ? { type } : {};

        const content = await WellnessContent.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get specific wellness content
// @route   GET /api/wellness/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const content = await WellnessContent.findByPk(req.params.id);

        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ message: 'Content not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Toggle favorite wellness content
// @route   POST /api/wellness/favorite/:id
// @access  Private
router.post('/favorite/:id', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const contentId = req.params.id;
        const content = await WellnessContent.findByPk(contentId);

        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        const isFavorited = await user.hasFavorite(content);

        if (isFavorited) {
            await user.removeFavorite(content);
        } else {
            await user.addFavorite(content);
        }

        const updatedFavorites = await user.getFavorites();

        res.json({
            favorites: updatedFavorites,
            isFavorited: !isFavorited
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user favorites
// @route   GET /api/wellness/user/favorites
// @access  Private
router.get('/user/favorites', protect, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const favorites = await user.getFavorites();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
