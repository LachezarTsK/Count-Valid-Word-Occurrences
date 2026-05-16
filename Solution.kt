
class Solution {

    fun countWordOccurrences(chunks: Array<String>, queries: Array<String>): IntArray {
        val wordToFrequency: MutableMap<String, Int> = createMapWordToFrequency(chunks)
        val resultQueries = IntArray(queries.size)
        for (i in queries.indices) {
            resultQueries[i] = wordToFrequency.getOrDefault(queries[i], 0)
        }
        return resultQueries
    }

    private fun createMapWordToFrequency(chunks: Array<String>): MutableMap<String, Int> {
        var word = StringBuilder()
        val wordToFrequency = mutableMapOf<String, Int>()

        for (chunk in chunks) {
            for (current in chunk) {
                if (word.isEmpty() && (isDash(current) || isSpace(current))) {
                    continue
                }
                if (isLetter(current) || (!isDash(word[word.length - 1]) && isDash(current))) {
                    word.append(current)
                    continue
                }

                updateMapWordToFrequency(word, wordToFrequency)
                word = StringBuilder()
            }
        }
        if (word.isNotEmpty()) {
            updateMapWordToFrequency(word, wordToFrequency)
        }
        return wordToFrequency
    }

    private fun updateMapWordToFrequency(word: StringBuilder, wordToFrequency: MutableMap<String, Int>) {
        var finalWord = word.toString()
        if (isDash(word[word.length - 1])) {
            finalWord = finalWord.substring(0, finalWord.length - 1)
        }
        wordToFrequency[finalWord] = wordToFrequency.getOrDefault(finalWord, 0) + 1
    }

    // input letters are only lowercase
    private fun isLetter(current: Char): Boolean {
        return current in 'a'..'z'
    }

    private fun isDash(current: Char): Boolean {
        return current == '-'
    }

    private fun isSpace(current: Char): Boolean {
        return current == ' '
    }
}
