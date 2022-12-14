const schedule = require('node-schedule');
const express = require("express");
const path = require("path");
const post = require("./lib/post")
const gen = require("./lib/gen");
const phrase = require("./lib/phrase");
const logger = require('./util/logger');
const genHashTag = require("./util/genHashTag");

const app = express();
const port = process.env.PORT || 3001;
const interval = process.env.POST_INTERVAL || "* * * * *"

app.get("/", function (req, res) {
    return res.sendFile(path.resolve("index.html"));
})

app.listen(port, function () {
    logger.appStarted(interval, port)
});

schedule.scheduleJob(interval, async function () {

        const prompt = phrase.generate();
        const status = prompt.phrase + "\n\n" +
            genHashTag(prompt.context.medium.noun) + " " +
            genHashTag(prompt.context.subject.noun) + " " +
            genHashTag(prompt.context.place.noun) + " " +
            genHashTag("dall e 2") + " " +
            genHashTag("dall e") + " " +
            genHashTag("Open AI") + " " +
            genHashTag("AI Art") + " " +
            genHashTag("AI Art Work");

        const image = await gen.image(prompt.phrase);
        post.twitter(image, prompt.phrase, status);
    }
);
