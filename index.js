'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: このコメント行より下の項目に注目してください。
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "プリパラおみくじ";
var GET_COUPLING_MESSAGE = "あなたにおすすめのカップリングは";
var HELP_MESSAGE = "おみくじを聞きたい時は「おみくじ」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";
var DESU_MESSAGE = "です";

//=========================================================================================================================================
//「TODO: ここから下のデータを自分用にカスタマイズしてください。」
//========================================================================================================================================
var charactors = [
    "らぁ",
    "みれ",
    "そふぃ",
    "シオ",
    "ドロ",
    "レオ",
    "みか",
    "あろ",
    "ファル",
    "ガァル",
    "ふわ",
    "あじ",
    "ひび"
]

//=========================================================================================================================================
//この行から下のコードに変更を加えると、スキルが動作しなくなるかもしれません。わかる人のみ変更を加えてください。  
//=========================================================================================================================================
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        function random_coupling() {
            let __random_index = (arr) => {
                return Math.floor(Math.random() * arr.length);
            }

            var data = charactors;
            var f = -1, s = -1;
            while (f === s) {
                f = __random_index(data);
                s = __random_index(data);
            }
            return data[f] + data[s];
        };
        var coupling = random_coupling();
        var speech_text = GET_COUPLING_MESSAGE + coupling + DESU_MESSAGE;
        this.emit(':tellWithCard', speech_text, SKILL_NAME, coupling);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        // Nothing to do
    }
};
