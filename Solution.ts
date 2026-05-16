
function countWordOccurrences(chunks: string[], queries: string[]): number[] {
    const wordToFrequency: CustomizedMap<string, number> = createMapWordToFrequency(chunks);
    const resultQueries: number[] = new Array(queries.length);
    for (let i = 0; i < queries.length; ++i) {
        resultQueries[i] = wordToFrequency.getOrDefault(queries[i], 0);
    }
    return resultQueries;
};

function createMapWordToFrequency(chunks: string[]): CustomizedMap<string, number> {
    let word = new Array();
    const wordToFrequency = new CustomizedMap<string, number>();

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

function updateMapWordToFrequency(word: string[], wordToFrequency: CustomizedMap<string, number>): void {
    let finalWord = word.join('');
    if (isDash(word[word.length - 1])) {
        finalWord = finalWord.substring(0, finalWord.length - 1);
    }
    wordToFrequency.set(finalWord, wordToFrequency.getOrDefault(finalWord, 0) + 1);
}

function isLetter(current: string): boolean {
    // input letters are only lowercase
    return current >= 'a' && current <= 'z';
}

function isDash(current: string): boolean {
    return current === '-';
}

function isSpace(current: string): boolean {
    return current === ' ';
}

class CustomizedMap<Key, Value> extends Map {
    getOrDefault(key: Key, defaultValue: Value) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}
