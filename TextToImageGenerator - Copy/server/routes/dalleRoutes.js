import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const openaiModule = await import('openai');  // Dynamic import for ES module
const { Configuration, OpenAIApi } = openaiModule;

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openaiClient = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send("Hello from DALL-E!");
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openaiClient.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error);
        // Improved error handling with optional chaining and default message
        res.status(500).send(error?.response?.data?.error?.message || 'An error occurred while processing your request');
    }
});

export default router;
