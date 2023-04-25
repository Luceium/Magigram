import os
import time
import json

def buildTrie():
    st = time.time()

    sortDictionary() # separates parts of speech
    sanitize()
    makeJsonFiles()
    
    et = time.time()
    print(f'buildTrie finished in {et - st:.3f}')

# removes: length < 4, plurals, useless words, scientific language, proper noun, conjunction, preposition, interjection, sounds effects

def sortDictionary():
    st = time.time()

    rmDirFiles('tinyDictionary/sorted')
    with open('tinyDictionary/cachedAPICalls.txt') as cached:
        for line in cached:
            word, pos_tag = line.strip().split(':')
            if pos_tag not in {"noun", "adjective", "verb"}:
                print(word, pos_tag)
            
            with open(f'tinyDictionary/sorted/{pos_tag}.txt', 'a') as sortedFile:
                sortedFile.write(word + "\n")
    
    et = time.time()
    print(f'sortDictionary finished in {et - st:.3f}')

def sanitize():
    st = time.time()

    with open('tinyDictionary/cachedAPICalls.txt', 'r') as f:
        lines = f.readlines()

    seen = set(lines)

    with open('tinyDictionary/cachedAPICalls.txt', 'w') as f:
        for line in seen:
            f.write(line)

    et = time.time()
    print(f'sanitize finished in {et - st:.3f}')

trie = {}
def makeJsonFiles():
    st = time.time()

    rmDirFiles('tinyDictionary/JSON')
    for posFile in os.listdir('tinyDictionary/sorted'):
        with open(f'tinyDictionary/sorted/{posFile}') as pos, open(f'tinyDictionary/JSON/{posFile[:-4]}.json', 'w') as jsonFile:
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

def rmDirFiles(dir_path):
    # loop over the files in the directory
    for file_name in os.listdir(dir_path):
        os.remove(dir_path + "/" + file_name)

buildTrie()