const express = require('express');
const router = express.Router();
const axios = require('axios');

const OPENAI_API_KEY = 'sk-proj-fEQK3P4VmTgLKGaussb5T3BlbkFJ8gNkcau7Js0X0zy8WKUN';

router.post('/', async (req, res) => {
    const { messages } = req.body;

    if (!messages) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'text-davinci-003',
                prompt: messages,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const chatResponse = response.data.choices[0].text.trim();
        res.json({ response: chatResponse });
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'OpenAI API endpoint not found' });
        } else {
            res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
        }
    }
});

module.exports = router;
