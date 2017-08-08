/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const mlk = [
    'Intelligence plus character - that is the goal of true education.',
    'If we are not careful, our colleges will produce a group of close-minded, unscientific, illogical propagandists, consumed with immoral acts. Be careful, brethren! Be careful, teachers!',
    'True peace is not merely the absence of tension; it is the presence of justice.'  ,
    'Science investigates; religion interprets. Science gives man knowledge, which is power; religion gives man wisdom, which is control. Science deals mainly with facts; religion deals mainly with values. The two are not rivals.',
    'The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.',
    'We know through painful experience that freedom is never voluntarily given by the oppressor, it must be demanded by the oppressed.',
    'Injustice anywhere is a threat to justice everywhere. We are caught in an inescapable network of mutuality, tied in a single garment of destiny. Whatever affects one directly, affects all indirectly.',
    'Out of the mountain of despair, a stone of hope.',
    'We have also come to this hallowed spot to remind America of the fierce urgency of Now. This is no time to engage in the luxury of cooling off or to take the tranquilizing drug of gradualism. Now is the time to make real the promises of democracy.',
    'Darkness cannot drive out darkness, only light can do that. Hate cannot drive out hate, only love can do that.',
    'I believe that unarmed truth and unconditional love will have the final word in reality. This is why right, temporarily defeated, is stronger than evil triumphant.',
    'The time is always right to do what is right.',
    'The contemporary tendency in our society is to base our distribution on scarcity, which has vanished, and to compress our abundance into the overfed mouths of the middle and upper classes until they gag with superfluity. If democracy is to have breadth of meaning, it is necessary to adjust this inequity. It is not only moral, but it is also intelligent. We are wasting and degrading human life by clinging to archaic thinking.',
    'Be a bush if you can\'t be a tree. If you can\'t be a highway, just be a trail. If you can\'t be a sun, be a star. For it isn\'t by size that you win or fail. Be the best of whatever you are.',
    'For when people get caught up with that which is right and they are willing to sacrifice for it, there is no stopping point short of victory.',
    'All we say to America is, "Be true to what you said on paper." If I lived in China or even Russia, or any totalitarian country, maybe I could understand the denial of certain basic First Amendment privileges, because they hadn\'t committed themselves to that over there. But somewhere I read of the freedom of assembly. Somewhere I read of the freedom of speech. Somewhere I read of the freedom of the press. Somewhere I read that the greatness of America is the right to protest for right.',
    'We\'ve got some difficult days ahead. But it really doesn\'t matter with me now because I\'ve been to the mountaintop . . .I\'ve looked over and I\'ve seen the promised land. I may not get there with you. But I want you to know tonight that we as a people will get to the promised land.',
    'Man must evolve for all human conflict a method which rejects revenge, aggression and retaliation. The foundation of such a method is love.',
    'Let no man pull you so low as to hate him.',
    'Let us not seek to satisfy our thirst for freedom by drinking from the cup of bitterness and hatred.',
    '?I believe that unarmed truth and unconditional love will have the final word in reality. This is why right, temporarily defeated, is stronger than evil triumphant.',
    'Power without love is reckless and abusive, and love without power is sentimental and anemic. Power at its best is love implementing the demands of justice, and justice at its best is power correcting everything that stands against love.',
    'Without love, there is no reason to know anyone, for love will in the end connect us to our neighbors, our children and our hearts.',
    'He who is devoid of the power to forgive is devoid of the power to love.',
    'In some not too distant tomorrow the radiant stars of love and brotherhood will shine over our great nation with all their scintillating beauty.',
    'One of the greatest problems of history is that the concepts of love and power are usually contrasted as polar opposites. Love is identified with a resignation of power and power with a denial of love. ',
    'What is more tragic than to see a person who has risen to the disciplined heights of tough-mindedness but has at the same time sunk to the passionless depths of hard-heartedness?',
    'Forgiveness is not an occasional act; it is a constant attitude.',
    'We shall match your capacity to inflict suffering by our capacity to endure suffering. We will meet your physical force with soul force. Do to us what you will. And we shall continue to love you.',
    'Since crime often grows out of a sense of futility and despair, Negro parents must be urged to give their children the love, attention, and sense of belonging that a segregated society deprives them of.',
    'That\'s love, you see. It is redemptive, and this is why Jesus says love. There\'s something about love that builds up and is creative. There is something about hate that tears down and is destructive. So love your enemies.',
    'Now there is a final reason I think that Jesus says, "Love your enemies." It is this: that love has within it a redemptive power. And there is a power there that eventually transforms individuals.',
    'Love yourself, and that means rational and healthy self-interest. You are commanded to do that. That\'s the length of life. Then follow that: Love your neighbor as you love yourself. You are commanded to do that. That\'s the breadth of life.',
    'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin, but by the content of their character.',
    'Human progress is neither automatic nor inevitable... Every step toward the goal of justice requires sacrifice, suffering, and struggle; the tireless exertions and passionate concern of dedicated individuals.',
    'The true measure of a man is not how he behaves in moments of comfort and convenience but how he stands at times of controversy and challenges.',
    'Our lives begin to end the day we become silent about things that matter.',
    'Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.',
    'Change does not roll in on the wheels of inevitability, but comes through continuous struggle. And so we must straighten our backs and work for our freedom. A man can\'t ride you unless your back is bent.',
    'Freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed.',
    'That old law about \'an eye for an eye\' leaves everybody blind. The time is always right to do the right thing.',
    'We must build dikes of courage to hold back the flood of fear.',
    'One has a moral responsibility to disobey unjust laws.',
    'If you lose hope, somehow you lose the vitality that keeps life moving, you lose that courage to be, that quality that helps you go on in spite of it all. And so today I still have a dream.',
    'There is nothing more majestic than the determined courage of individuals willing to suffer and sacrifice for their freedom and dignity.',
    'So I have tried to make it clear that it is wrong to use immoral means to attain moral ends. But now I must affirm that it is just as wrong, or even more so, to use moral means to preserve immoral ends.',
];

const languageStrings = {
    'en': {
        translation: {
            FACTS: mlk,
            SKILL_NAME: 'Martin Luther King Quotes',
            GET_FACT_MESSAGE: "Martin Luther King said: ",
            HELP_MESSAGE: 'This is the help message ',
            HELP_REPROMPT: 'Please Try again. ',
            UNHANDLED_MESSAGE: "I'm not sure what you're asking for.  ",
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: mlk,
            SKILL_NAME: 'Martin Luther King Quotes',
        },
    },
    'en-GB': {
        translation: {
            FACTS: mlk,
            SKILL_NAME: 'Martin Luther King Quotes',
        },
    },
    'de': {
        translation: {
            FACTS: mlk,
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
        //this.emit(':tellWithCard', "Launch Request", this.t('SKILL_NAME'), "LaunchRequest");
    },

    'EatSomethingIntent': function () {
        //this.emit(':tellWithCard', "Yum, that was good pie.", this.t('SKILL_NAME'), "EatPieIntent");
        var food = this.event.request.intent.slots.foodSlot.value;
        if (!food){
            this.emit(':tellWithCard', "I'm not sure what to eat ", this.t('SKILL_NAME'), "Eat Something");
        } else if (food.startsWith("a ")) {
            this.emit(':tellWithCard', "Yum, that was a good "+ food.substr(2), this.t('SKILL_NAME'), "Eat Something");
        } else {
            this.emit(':tellWithCard', "Yum, that was good "+ food, this.t('SKILL_NAME'), "Eat Something");
        }
    },

    'GetQuoteIntent': function () {
        this.emit('GetFact');
    },

    'GetFact': function () {
        console.log('issuing quote')
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.emit(':tell', this.t('UNHANDLED_MESSAGE') + this.t('HELP_REPROMPT'));
    },
};

exports.handler = function (event, context) {
    console.log(event);
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
