
using System;
using System.Collections.Generic;

public class Solution
{
    public int[] CountWordOccurrences(string[] chunks, string[] queries)
    {
        Dictionary<string, int> wordToFrequency = CreateMapWordToFrequency(chunks);
        int[] resultQueries = new int[queries.Length];
        for (int i = 0; i < queries.Length; ++i)
        {
            resultQueries[i] = wordToFrequency.GetValueOrDefault(queries[i], 0);
        }
        return resultQueries;
    }

    private Dictionary<string, int> CreateMapWordToFrequency(string[] chunks)
    {
        StringBuilder word = new StringBuilder();
        Dictionary<string, int> wordToFrequency = [];

        foreach (string chunk in chunks)
        {
            foreach (char current in chunk)
            {
                if (word.Length == 0 && (IsDash(current) || IsSpace(current)))
                {
                    continue;
                }
                if (IsLetter(current) || (!IsDash(word[word.Length - 1]) && IsDash(current)))
                {
                    word.Append(current);
                    continue;
                }

                UpdateMapWordToFrequency(word, wordToFrequency);
                word = new StringBuilder();
            }
        }
        if (word.Length > 0)
        {
            UpdateMapWordToFrequency(word, wordToFrequency);
        }
        return wordToFrequency;
    }

    private void UpdateMapWordToFrequency(StringBuilder word, Dictionary<string, int> wordToFrequency)
    {
        string finalWord = word.ToString();
        if (IsDash(word[word.Length - 1]))
        {
            finalWord = finalWord.Substring(0, finalWord.Length - 1);
        }
        wordToFrequency.TryAdd(finalWord, 0);
        ++wordToFrequency[finalWord];
    }

    // input letters are only lowercase
    private bool IsLetter(char current)
    {
        return current >= 'a' && current <= 'z';
    }

    private bool IsDash(char current)
    {
        return current == '-';
    }

    private bool IsSpace(char current)
    {
        return current == ' ';
    }
}
