
/**
 * @param {string[]} chunks
 * @param {string[]} queries
 * @return {number[]}
 */
var countWordOccurrences = function (chunks, queries) {
    const wordToFrequency = createMapWordToFrequency(chunks);
    const resultQueries = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        resultQueries[i] = wordToFrequency.getOrDefault(queries[i], 0);
    }
    return resultQueries;
};

/**
 * @param {string[]} chunks
 * @return {CustomizedMap<string, number>}
 */
function createMapWordToFrequency(chunks) {
    let word = new Array();
    const wordToFrequency = new CustomizedMap();

    for (let chunk of chunks) {
        for (let current of chunk) {
            if (word.length === 0 && (isDash(current) || isSpace(current))) {
                continue;
            }
            if (isLetter(current) || (!isDash(word[word.length - 1]) && isDash(current))) {
                word.push(current);
                continue;
            }

            updateMapWordToFrequency(word, wordToFrequency);
            word = new Array();
        }
    }
    if (word.length > 0) {
        updateMapWordToFrequency(word, wordToFrequency);
    }
    return wordToFrequency;
}

/**
 * @param {string} word
 * @param {CustomizedMap<string, number>}wordToFrequency
 * @return void
 */
function updateMapWordToFrequency(word, wordToFrequency) {
    let finalWord = word.join('');
    if (isDash(word[word.length - 1])) {
        finalWord = finalWord.substring(0, finalWord.length - 1);
    }
    wordToFrequency.set(finalWord, wordToFrequency.getOrDefault(finalWord, 0) + 1);
}

/**
 * @param {string} current
 * @return boolean
 */
function isLetter(current) {
    // input letters are only lowercase
    return current >= 'a' && current <= 'z';
}

/**
 * @param {string} current
 * @return boolean
 */
function isDash(current) {
    return current === '-';
}

/**
 * @param {string} current
 * @return boolean
 */
function isSpace(current) {
    return current === ' ';
}

class CustomizedMap extends Map {
    getOrDefault(key, defaultValue) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}
