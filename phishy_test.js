"use strict";

const phishy = require("./phishy");
const test = require("tape");

test("It checks if it is phishy", (assert) => {
    let words = [
        "palpay",
        "ppal",
        "poepal",
        "pay-pal",
        "paypal",
        "pypal",
        "papal",
        "paypl",
        "paypol",
        "payppal",
        "ppaypal",
        "paypall",
        "payzpal",
        "pazpal",
        "paipal",
        "yappale",
        "paaypal",
        "palypa"
    ];
    
    let dict = "paypal";
    
    assert.ok(words.every(word => phishy(dict, word)), "all the words are fishy");
    assert.end();
});


test("none of these words are fishy", (assert) => {
    let words = [
        "fish",
        "apple",
        "papple",
        "yaplap",
        "aplpay",
        "pay",
        "ppl",
        "polpay",
    ];
    

    let dict = "paypal";

    assert.ok(!words.some(word => phishy(dict, word)), "all the words are fishy");
    assert.end();
});


test("when combining fishy words, they are still fishy", assert => {
    const dict = ["american", "visa", "mortgage"];
    
    
    let words = [
        "omerican-express-customerservice",
        "help-v1sa",
        "reset-password-ameracan",
        "cheap-visua-online",
        "get-morgage",
        "morgage-online"
    ];
    
    words.forEach(word => {
        assert.ok(phishy(dict, word), "it's phishy: " + word);
    });
    
    assert.end();
})