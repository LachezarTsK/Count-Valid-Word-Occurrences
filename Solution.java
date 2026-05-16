
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] countWordOccurrences(String[] chunks, String[] queries) {
        Map<String, Integer> wordToFrequency = createMapWordToFrequency(chunks);
        int[] resultQueries = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            resultQueries[i] = wordToFrequency.getOrDefault(queries[i], 0);
        }
        return resultQueries;
    }

    private Map<String, Integer> createMapWordToFrequency(String[] chunks) {
        StringBuilder word = new StringBuilder();
        Map<String, Integer> wordToFrequency = new HashMap<>();

        for (String chunk : chunks) {
            for (char current : chunk.toCharArray()) {
                if (word.isEmpty() && (isDash(current) || isSpace(current))) {
                    continue;
                }
                if (isLetter(current) || (!isDash(word.charAt(word.length() - 1)) && isDash(current))) {
                    word.append(current);
                    continue;
                }

                updateMapWordToFrequency(word, wordToFrequency);
                word = new StringBuilder();
            }
        }
        if (!word.isEmpty()) {
            updateMapWordToFrequency(word, wordToFrequency);
        }
        return wordToFrequency;
    }

    private void updateMapWordToFrequency(StringBuilder word, Map<String, Integer> wordToFrequency) {
        String finalWord = word.toString();
        if (isDash(word.charAt(word.length() - 1))) {
            finalWord = finalWord.substring(0, finalWord.length() - 1);
        }
        wordToFrequency.put(finalWord, wordToFrequency.getOrDefault(finalWord, 0) + 1);
    }

    // input letters are only lowercase
    private boolean isLetter(char current) {
        return current >= 'a' && current <= 'z';
    }

    private boolean isDash(char current) {
        return current == '-';
    }

    private boolean isSpace(char current) {
        return current == ' ';
    }
}
