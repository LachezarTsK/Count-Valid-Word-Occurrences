
package main

import "strings"

func countWordOccurrences(chunks []string, queries []string) []int {
    var wordToFrequency map[string]int = createMapWordToFrequency(chunks)
    resultQueries := make([]int, len(queries))
    for i := range queries {
        resultQueries[i] = getOrDefault(wordToFrequency, queries[i], 0)
    }
    return resultQueries
}

func createMapWordToFrequency(chunks []string) map[string]int {
    word := strings.Builder{}
    wordToFrequency := map[string]int{}

    for _, chunk := range chunks {
        for i := range chunk {
            if word.Len() == 0 && (isDash(chunk[i]) || isSpace(chunk[i])) {
                continue
            }
            if isLetter(chunk[i]) || (!isDash(word.String()[word.Len() - 1]) && isDash(chunk[i])) {
                word.WriteByte(chunk[i])
                continue
            }

            updateMapWordToFrequency(word, wordToFrequency)
            word.Reset()
        }
    }
    if word.Len() != 0 {
        updateMapWordToFrequency(word, wordToFrequency)
    }
    return wordToFrequency
}

func updateMapWordToFrequency(word strings.Builder, wordToFrequency map[string]int) {
    finalWord := word.String()
    if isDash(finalWord[word.Len() - 1]) {
        finalWord = finalWord[0 : len(finalWord) - 1]
    }
    wordToFrequency[finalWord] = getOrDefault(wordToFrequency, finalWord, 0) + 1
}

// input letters are only lowercase
func isLetter(current byte) bool {
    return current >= 'a' && current <= 'z'
}

func isDash(current byte) bool {
    return current == '-'
}

func isSpace(current byte) bool {
    return current == ' '
}

func getOrDefault[Key comparable, Value any](toCheck map[Key]Value, key Key, defaultValue Value) Value {
    if value, has := toCheck[key]; has {
        return value
    }
    return defaultValue
}

func containsKey[Key comparable, Value any](mapToCheck map[Key]Value, key Key) bool {
    var has bool
    _, has = mapToCheck[key]
    return has
}
