# phishy
Phishy string equality using levenshtein-distance

## Intro

Consider a word often used to scam people like "paypal".
Rather then applying blacklist or some regular expressions, we can use [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) to determine simliarty.

The following words are considered phisy matching against "paypal":

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

Phishy looks for substrings to match as well, e.g. `pazpal-secure` would qualify as phishy.

## Installation

    npm install phishy
    
## Usage

```javascript
const phishy = require("phishy");

phishy("mortgage", "mogage"); // it's true

phishy.score("mortgage", "mogage"); // [ [ 1.5, 'mortgage' ] ]

phishy.score(["mortgage", "loan"], "morgage-loans") // [ [ 2, 'mortgage' ], [ 0, 'loan' ] ]

```

## Functions

### phishy.score(dict, word)
Get all scores for a word against the dictionary

* dict        - A dictionary to check against
* word        - The word to check

### phishy(dict, word, dist, len)

Score a "phishy" word against the dictionary applying some heuristics.
Words shorter then len are ignored.

* dict        - A dictionary to check against
* word        - The word to check
* dist        - The maximum distance considered phishy (3)
* len         - The minimum length of a word to be considered phisy (3)

## Awesomeness

It's all done by [fast-levenshtein](https://www.npmjs.com/package/fast-levenshtein)

## Licence

MIT License

Copyright (c) 2017 Matthijs van Henten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
