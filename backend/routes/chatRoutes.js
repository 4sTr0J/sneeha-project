const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { Message, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Get user conversations
// @route   GET /api/chat/conversations
// @access  Private
router.get('/conversations', protect, async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender: req.user.id },
                    { receiver: req.user.id }
                ]
            },
            include: [
                { model: User, as: 'senderUser', attributes: ['id', 'name', 'avatar'] },
                { model: User, as: 'receiverUser', attributes: ['id', 'name', 'avatar'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get messages for a conversation
// @route   GET /api/chat/messages/:conversationId
// @access  Private
router.get('/messages/:conversationId', protect, async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: {
                conversationId: req.params.conversationId
            },
            include: [
                { model: User, as: 'senderUser', attributes: ['id', 'name', 'avatar'] }
            ],
            order: [['createdAt', 'ASC']]
        });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Send a message
// @route   POST /api/chat/messages
// @access  Private
router.post('/messages', protect, async (req, res) => {
    try {
        const { conversationId, content, isAI } = req.body;

        const message = await Message.create({
            sender: req.user.id,
            conversationId,
            content,
            isAI: isAI || false
        });

        const populatedMessage = await Message.findByPk(message.id, {
            include: [{ model: User, as: 'senderUser', attributes: ['id', 'name', 'avatar'] }]
        });

        // If AI message, create a mock AI response
        if (isAI) {
            setTimeout(async () => {
                await Message.create({
                    sender: req.user.id, // In a real app, this would be an AI user ID
                    conversationId,
                    content: "I'm here to support you. How are you feeling today?",
                    isAI: true
                });
            }, 1000);
        }

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
