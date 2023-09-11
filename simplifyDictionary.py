import os
import time
import requests
from config import API_KEY
import enchant
import inflect
import json

# formatted API URL
url = "https://wordsapiv1.p.rapidapi.com/words/{}/definitions"
# API information
headers = {
	"X-RapidAPI-Key": API_KEY,
	"X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
}
# create an enchant dictionary for English words
dictionary = enchant.Dict("en_US")
# create an inflect engine to handle pluralization
p = inflect.engine()
# Has words that won't be useful for anagrams
uselessWords = {'obviously', 'okay', 'once', 'ones', 'only', 'onto', 'other', 'others', 'otherwise', 'ought', 'ours', 'ourselves', 'outside', 'over', 'overall', 'perhaps', 'placed', 'please', 'plus', 'presumably', 'probably', 'provides', 'really', 'regarding', 'regardless', 'regards', 'respectively', 'right', 'said', 'same', 'saying', 'says', 'secondly', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 'sent', 'seriously', 'seven', 'several', 'shall', 'should', 'since', 'some', 'somebody', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specified', 'specify', 'specifying', 'still', 'such', 'sure', 'take', 'taken', 'tell', 'tends', 'than', 'thank', 'thanks', 'thats', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein', 'theres', 'thereupon', 'these', 'they', 'think', 'this', 'thorough', 'thoroughly', 'those', 'though', 'three', 'through', 'throughout', 'thru', 'thus', 'together', 'took', 'toward', 'towards', 'tried', 'tries', 'truly', 'trying', 'twice', 'under', 'unfortunately', 'unless', 'unlikely', 'until', 'unto', 'upon', 'used', 'useful', 'uses', 'using', 'usually', 'value', 'various', 'very', 'want', 'wants', 'welcome', 'well', 'went', 'what', 'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while', 'whither', 'whoever', 'whole', 'whom', 'whose', 'will', 'willing', 'wish', 'with', 'within', 'without', 'wonder', 'would', 'yours', 'yourself', 'yourselves', 'able', 'about', 'above', 'according', 'accordingly', 'across', 'actually', 'after', 'afterwards', 'again', 'against', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'amongst', 'another', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate', 'appropriate', 'around', 'aside', 'asking', 'associated', 'available', 'away', 'awfully', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 'between', 'beyond', 'both', 'brief', 'came', 'cannot', 'cant', 'cause', 'causes', 'certain', 'certainly', 'changes', 'clearly', 'come', 'comes', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'course', 'currently', 'definitely', 'described', 'despite', 'different', 'does', 'doing', 'done', 'down', 'downwards', 'during', 'each', 'eight', 'either', 'else', 'elsewhere', 'enough', 'entirely', 'especially', 'even', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'example', 'except', 'followed', 'following', 'follows', 'four', 'further', 'furthermore', 'gets', 'getting', 'given', 'gives', 'goes', 'going', 'gone', 'gotten', 'greetings', 'happens', 'hardly', 'have', 'having', 'hello', 'help', 'hence', 'here', 'hereafter', 'hereby'}

def buildTrie():
    st = time.time()

    sanitizeDictionary() # removes words from dictionary
    sortDictionary() # separates parts of speech
        
    # pos == part of speech
    makeJsonFiles()

    et = time.time()
    print(f'buildTrie finished in {et - st:.3f}')

trie = {}
def makeJsonFiles():
    st = time.time()

    rmDirFiles('dictionary/JSON')
    for posFile in os.listdir('dictionary/sorted'):
        with open(f'dictionary/sorted/{posFile}') as pos, open(f'dictionary/JSON/{posFile[:-4]}.json', 'w') as jsonFile:
            for word in pos:
                add_word_to_trie(word.strip())
            json.dump(trie, jsonFile)
            trie.clear()

    et = time.time()
    print(f'makeJsonFile finished in {et - st:.3f}')

def add_word_to_trie(word):
    first_three_letters = word[:3]
    if first_three_letters not in trie:
        trie[first_three_letters] = {}
    if word not in trie[first_three_letters]:
        letterFrequency = {}
        for letter in word:
            letterFrequency[letter] = letterFrequency.get(letter, 0) + 1
        trie[first_three_letters][word] = letterFrequency

# removes: length < 4, plurals, useless words, scientific language, proper noun, conjunction, preposition, interjection, sounds effects
def sanitizeDictionary():
    totalWords = 0
    st = time.time()

    rmDirFiles('dictionary/sanitized')
    for wordListFile in os.listdir('dictionary/src'):
        with open(f'dictionary/src/{wordListFile}', encoding='utf-8') as words, open(f'dictionary/sanitized/{wordListFile}', 'a') as sanitizedWordList:
            for word in words:
                word = word.strip()
                if len(word) > 3 and word.isascii() and not (word.endswith('ed') or word.endswith('ing')) and not word in uselessWords and dictionary.check(word) and not p.singular_noun(word):
                    sanitizedWordList.write(word + "\n")
                    totalWords += 1
        
    et = time.time()
    print(f'sanitizeDictionary finished in {et - st:.3f}')
    print(f'reduced to {totalWords} words')

def sortDictionary():
    st = time.time()

    rmDirFiles('dictionary/sorted')
    for wordListFile in os.listdir('dictionary/sanitized'):
        with open(f'dictionary/sanitized/{wordListFile}') as words:
            for word in words:
                word = word.strip()
                print(word)
                pos_tag = cachedAPICall(word)
                if not pos_tag:
                    # print(word, "was not in cache")
                    # response = requests.request("GET", url.format(word), headers=headers)
                    # data = response.json()
                    # print('going to sleep', data)
                    # time.sleep(35) # prevents paying

                    # try:
                    #     pos_tag = data.get("definitions", "Unknown")[0].get("partOfSpeech", "Unknown")
                    # except:
                    #     pos_tag = "errors"
                    # if not pos_tag:
                    #     pos_tag = "errors"
                    # # cache api call
                    # with open('dictionary/cachedAPICalls.txt', 'a') as cache:
                    #     cache.write(word + ":" + pos_tag + "\n")

                    # all words have been categorized so none categorized words will be marked as null
                    with open(f'dictionary/sorted/null.txt', 'a') as sortedFile:
                        sortedFile.write(word + "\n")
                

                with open(f'dictionary/sorted/{pos_tag}.txt', 'a') as sortedFile:
                    sortedFile.write(word + "\n")

    
    et = time.time()
    print(f'sortDictionary finished in {et - st:.3f}')

def cachedAPICall(targetWord):
    with open('dictionary/cachedAPICalls.txt') as cached:
        for line in cached:
            word, POSs = line.split(':')
            if word != targetWord:
                continue
            return POSs.strip()


def rmDirFiles(dir_path):
    # loop over the files in the directory
    for file_name in os.listdir(dir_path):
        os.remove(dir_path + "/" + file_name)
            
# def makeJsonFile(inputFile):

# sanitizeDictionary()
# sortDictionary()
buildTrie()