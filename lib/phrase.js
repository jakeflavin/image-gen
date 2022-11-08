const Handlebars = require("handlebars");
const getRandomInt = require("../util/getRandomInt");
const logger = require('../util/logger');

const mediums = [
    { article: "a", noun: "photo" },
    { article: "a", noun: "cartoon" },
    { article: "an", noun: "oil painting" },
    { noun: "graffiti" },
    { article: "a", noun: "3d rendering" },
    { article: "a", noun: "comic book cover" },
    { article: "a", noun : "poster" },
];

const subjects = [
    { article: "a", noun : "firefighter" },
    { article: "a", noun : "marine" },
    { article: "a", noun: "nurse" },
    { article: "a", noun: "doctor" },
    { article: "a", noun: "teacher" },
    { article: "a", noun: "taxi driver" },
    { article: "a", noun : "news anchor" },
    { article: "a", noun : "football coach" }
];

const dishes = [
    { noun : "green bean casserole" },
    { noun : "corn casserole" },
    { article: "a", noun : "turkey leg" },
    { noun: "roasted turkey"},
    { noun : "mashed potatoes and gravy" },
    { noun : "stuffing" },
    { noun : "green bean casserole" },
    { article: "a", noun : "dinner roll" },
    { noun : "pumpkin pie" },
    { noun : "cranberry sauce" }
]

const places = [
    { noun: "new york city" },
    { noun: "baltimore" },
    { noun: "philadelphia" },
    { noun: "pittsburgh" },
    { noun: "chicago" },
    { noun: "nashville" },
    { noun: "dallas" },
    { noun: "houston" },
    { noun: "new orleans" }
];

function generate() {
    const context = {
        medium: mediums[getRandomInt(mediums.length)],
        subject: subjects[getRandomInt(subjects.length)],
        dish: dishes[getRandomInt(dishes.length)],
        place: places[getRandomInt(places.length)]
    }

    const template = "{{#if medium.article}}{{medium.article}} {{/if}}{{medium.noun}} " +
        "of {{#if subject.article}}{{subject.article}} {{/if}}{{subject.noun}} " +
        "eating {{#if dish.article}}{{dish.article}} {{/if}}{{dish.noun}} " +
        "in {{#if place.article}}{{place.article}} {{/if}}{{place.noun}}";

    const prompt = Handlebars.compile(template);
    const phrase = prompt(context).toLowerCase();
    logger.info("Generated prompt: " + phrase);

    return { phrase: phrase, context: context };
}

module.exports = {
    generate
}