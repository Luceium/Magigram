import os
import time
import requests

# API endpoint for Merriam-Webster Dictionary API
url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"

# Your API key from Merriam-Webster
api_key = "your_api_key_here"

uselessWords = {'obviously', 'okay', 'once', 'ones', 'only', 'onto', 'other', 'others', 'otherwise', 'ought', 'ours', 'ourselves', 'outside', 'over', 'overall', 'perhaps', 'placed', 'please', 'plus', 'possible', 'provides', 'quite', 'regarding', 'regardless', 'regards', 'respectively', 'right', 'said', 'same', 'saying', 'says', 'secondly', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sent', 'several', 'shall', 'should', 'since', 'some', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'soon', 'sorry', 'specified', 'specify', 'specifying', 'still', 'such', 'sure', 'take', 'taken', 'tell', 'tends', 'than', 'thank', 'thanks', 'that', 'thats', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein', 'theres', 'thereupon', 'these', 'they', 'think', 'third', 'this', 'thorough', 'thoroughly', 'those', 'though', 'through', 'throughout', 'thru', 'thus', 'together', 'took', 'toward', 'towards', 'tries', 'trying', 'unless', 'unlikely', 'until', 'unto', 'upon', 'used', 'uses', 'using', 'usually', 'value', 'various', 'very', 'want', 'wants', 'welcome', 'well', 'went', 'were', 'what', 'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while', 'whither', 'whoever', 'whole', 'whom', 'whose', 'with', 'within', 'without', 'would', 'your', 'yours', 'yourself', 'yourselves', 'about', 'according', 'accordingly', 'across', 'actually', 'after', 'afterwards', 'again', 'against', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'amongst', 'another', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate', 'around', 'aside', 'asking', 'away', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'beside', 'besides', 'both', 'brief', 'came', 'cannot', 'cant', 'cause', 'causes', 'certain', 'changes', 'clearly', 'come', 'comes', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'course', 'currently', 'definitely', 'described', 'despite', 'does', 'doing', 'done', 'downwards', 'during', 'each', 'eight', 'either', 'else', 'elsewhere', 'enough', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'exactly', 'example', 'except', 'followed', 'following', 'follows', 'furthermore', 'gets', 'getting', 'given', 'gives', 'goes', 'going', 'gotten', 'greetings', 'happens', 'hardly', 'have', 'having', 'hello', 'help', 'hence', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'himself', 'hither', 'hopefully', 'howbeit', 'however', 'inasmuch', 'indeed', 'indicate', 'indicated', 'indicates', 'inner', 'insofar', 'instead', 'into', 'inward', 'itself', 'just', 'keep', 'keeps', 'kept', 'knows', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'like', 'liked', 'likely', 'look', 'looking', 'looks', 'mainly', 'many', 'maybe', 'meanwhile', 'more', 'moreover', 'most', 'mostly', 'much', 'must', 'myself', 'name', 'namely', 'need', 'needs', 'neither', 'never', 'nevertheless', 'next', 'none', 'normally', 'admittedly', 'consequently', 'finally', 'furthermore', 'however', 'indeed', 'instead', 'likewise', 'meanwhile', 'moreover', 'nevertheless', 'nonetheless', 'notwithstanding', 'otherwise', 'overall', 'particularly', 'similarly', 'subsequently', 'therefore', 'thus', 'ultimately', 'undoubtedly', 'whereas', 'yet', 'amid', 'atop', 'beneath', 'inside', 'opposite', 'past', 'underneath'}

def buildTrie():
    st = time.time()

    sanitizeDictionary()
    sortDictionary() # separates parts of speech
        
    # pos == part of speech
    for posWords in os.listdir('sortedPOSLists'):
        makeJsonFile(posWords)

    et = time.time()
    print(f'buildTrie finished in {et - st:.3f}')

# removes: length < 4, plurals, useless words, scientific language, proper noun, conjunction, preposition, interjection, sounds effects
def sanitizeDictionary():
    st = time.time()

    rmDirFiles('dictionary/sanitized')
    for wordListFile in os.listdir('dictionary/src'):
        wordList = open(f'dictionary/src/{wordListFile}', encoding='utf-8')
        words = wordList.read().split("\n")
        wordList.close()
        
        sanitizedWordList = open(f'dictionary/sanitized/{wordListFile}', 'a')

        for word in words:
            if len(word) > 3 and word.isascii() and not word in uselessWords:
                sanitizedWordList.write(word + "\n")

        sanitizedWordList.close()
        
    et = time.time()
    print(f'sanitizeDictionary finished in {et - st:.3f}')

def sortDictionary():
    st = time.time()

    rmDirFiles('dictionary/sorted')
    for wordListFile in os.listdir('dictionary/sanitized'):
        wordList = open(f'dictionary/sanitized/{wordListFile}')
        words = wordList.read()
        wordList.close()
        pos_tags = nltk.pos_tag(nltk.word_tokenize(words))
        for word, tag in pos_tags:
            sortedFile = open(f'dictionary/sorted/{tag}.txt', 'a')
            sortedFile.write(word + "\n")
            sortedFile.close()
    
    et = time.time()
    print(f'sortDictionary finished in {et - st:.3f}')

def rmDirFiles(dir_path):
    # loop over the files in the directory
    for file_name in os.listdir(dir_path):
        os.remove(dir_path + "/" + file_name)
            
# def makeJsonFile(inputFile):

sanitizeDictionary()
sortDictionary()