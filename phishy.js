const leven = require("fast-levenshtein");

/**
 * Improves scores for small words. may not be needed if len < 4
 */
function rate(score, phishyWord, word) {
    let r = phishyWord.length / word.length;
    return r * score;
}

function scoreString(word, phishyWord) {
    if (phishyWord.length <= word.length)
        return rate(leven.get(phishyWord, word), phishyWord, word);
        
    let scores = [];
    
    let max = phishyWord.length - word.length + 1;
    
    for (let i = 0; i < max; i++) {
        let part = phishyWord.substr(i, word.length);
        let dist = leven.get(part, word);

        scores.push(rate(dist, part, word));
    }

    return Math.min.apply(null, scores);
}

/**
 * Get all scores for a word against the dictionary
 * @param Array|String dict        - A dictionary to check against
 * @param String phishyWord - The word to check
 */
function score(dict, phishyWord) {
    if (!Array.isArray(dict)) dict = [dict];
    return dict.map(word => {
        let dist = scoreString(word, phishyWord);
        return [dist, word];
    }).filter(score => !!score);
}

/**
 * Score a "phishy" word against the dictionary applying some heuristics.
 * Words shorter then len are ignored.
 * 
 * @param Array|String dict        - A dictionary to check against
 * @param String phishyWord - The word to check
 * @param Number dist       - The maximum distance considered phishy
 * @param Number len        - The minimum length of a word to be considred phishy
 */
function phishy(dict, phishyWord, dist=3, len=3) {
    if (phishyWord.length <= len) return false;

    let scores = score(dict, phishyWord).map(([dist]) => dist);

    if (!scores.length) 
        return false;
        
    let min = Math.min.apply(null, scores);
    return min < dist;
}

module.exports = phishy;
module.exports.score = score;
