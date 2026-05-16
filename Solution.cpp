
#include <span>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

/*
To demonstrate customizing a standard library container, class unordered_map is extended
and method 'getOrDefault' is implemented. Otherwise, without extending unordered_map,
we could simply check with the in-build method 'wordToFrequency.contains(key)',
or even shorter, with just 'wordToFrequency[key]', though the latter will create
a key-value pair, if the key is not already in the map.
*/
template<
    class Key,
    class T,
    class Hash = hash<Key>,
    class Pred = equal_to<Key>,
    class Alloc = allocator<pair<const Key, T>>> class CustomizedHashMap :
    public unordered_map<
    Key,
    T,
    Hash,
    Pred,
    Alloc> {

    public:
        T getOrDefault(Key key, T defaultValue) {
            if (this->contains(key)) {
                return this->at(key);
            }
            return defaultValue;
        }
};

class Solution {

public:
    vector<int> countWordOccurrences(vector<string>& chunks, vector<string>& queries) {
        CustomizedHashMap<string, int> wordToFrequency = createMapWordToFrequency(chunks);
        vector<int> resultQueries(queries.size());
        for (int i = 0; i < queries.size(); ++i) {
            resultQueries[i] = wordToFrequency.getOrDefault(queries[i], 0);
        }
        return resultQueries;
    }

private:
    CustomizedHashMap<string, int> createMapWordToFrequency(span<const string> chunks) {
        string word;
        CustomizedHashMap<string, int> wordToFrequency;

        for (const auto& chunk : chunks) {
            for (const auto& current : chunk) {
                if (word.empty() && (isDash(current) || isSpace(current))) {
                    continue;
                }
                if (isLetter(current) || (!isDash(word[word.length() - 1]) && isDash(current))) {
                    word.push_back(current);
                    continue;
                }

                updateMapWordToFrequency(word, wordToFrequency);
                word.clear();
            }
        }
        if (!word.empty()) {
                updateMapWordToFrequency(word, wordToFrequency);
        }
        return wordToFrequency;
    }

    void updateMapWordToFrequency(string& word, CustomizedHashMap<string, int>& wordToFrequency) {
        if (isDash(word[word.length() - 1])) {
            word = word.substr(0, word.length() - 1);
        }
        ++wordToFrequency[word];
    }

    // input letters are only lowercase
    bool isLetter(char current) {
        return current >= 'a' && current <= 'z';
    }

    bool isDash(char current) {
        return current == '-';
    }

    bool isSpace(char current) {
        return current == ' ';
    }
};
