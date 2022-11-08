const Twit = require("twit");
const logger = require('../util/logger');

const twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function twitter (image, alt, status) {
    return twit.post('media/upload', { media_data: image},  function (err, data, resp) {
        const mediaIdStr = data.media_id_string;
        const meta_params = {
            media_id: mediaIdStr,
            alt_text: {
                text: alt
            }
        };

        twit.post('media/metadata/create', meta_params, function (err, data, resp) {
            if (!err) {
                const params = { status: status, media_ids: [mediaIdStr] };
                twit.post('statuses/update', params, function (err, data, resp) {
                    logger.info(`Successfully posted image with alt: ${alt}`);
                })
            }
        })
    })
}

module.exports = {
    twitter
}
