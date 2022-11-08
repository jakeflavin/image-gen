const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.OPEN_IA_ORG,
    apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function image (prompt) {
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
    })

    return response.data.data[0].b64_json;
}

module.exports = {
    image
}

