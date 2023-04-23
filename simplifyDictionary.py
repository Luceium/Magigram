import os
import nltk
from nltk.tokenize import word_tokenize

nltk.download('averaged_perceptron_tagger')  # download the pre-trained model

uselessWords = {'obviously', 'okay', 'once', 'ones', 'only', 'onto', 'other', 'others', 'otherwise', 'ought', 'ours', 'ourselves', 'outside', 'over', 'overall', 'perhaps', 'placed', 'please', 'plus', 'possible', 'provides', 'quite', 'regarding', 'regardless', 'regards', 'respectively', 'right', 'said', 'same', 'saying', 'says', 'secondly', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sent', 'several', 'shall', 'should', 'since', 'some', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhat', 'soon', 'sorry', 'specified', 'specify', 'specifying', 'still', 'such', 'sure', 'take', 'taken', 'tell', 'tends', 'than', 'thank', 'thanks', 'that', 'thats', 'their', 'theirs', 'them', 'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein', 'theres', 'thereupon', 'these', 'they', 'think', 'third', 'this', 'thorough', 'thoroughly', 'those', 'though', 'through', 'throughout', 'thru', 'thus', 'together', 'took', 'toward', 'towards', 'tries', 'trying', 'unless', 'unlikely', 'until', 'unto', 'upon', 'used', 'uses', 'using', 'usually', 'value', 'various', 'very', 'want', 'wants', 'welcome', 'well', 'went', 'were', 'what', 'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether', 'which', 'while', 'whither', 'whoever', 'whole', 'whom', 'whose', 'with', 'within', 'without', 'would', 'your', 'yours', 'yourself', 'yourselves', 'about', 'according', 'accordingly', 'across', 'actually', 'after', 'afterwards', 'again', 'against', 'allow', 'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'amongst', 'another', 'anybody', 'anyhow', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 'appreciate', 'around', 'aside', 'asking', 'away', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'beside', 'besides', 'both', 'brief', 'came', 'cannot', 'cant', 'cause', 'causes', 'certain', 'changes', 'clearly', 'come', 'comes', 'concerning', 'consequently', 'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 'could', 'course', 'currently', 'definitely', 'described', 'despite', 'does', 'doing', 'done', 'downwards', 'during', 'each', 'eight', 'either', 'else', 'elsewhere', 'enough', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'exactly', 'example', 'except', 'followed', 'following', 'follows', 'furthermore', 'gets', 'getting', 'given', 'gives', 'goes', 'going', 'gotten', 'greetings', 'happens', 'hardly', 'have', 'having', 'hello', 'help', 'hence', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'himself', 'hither', 'hopefully', 'howbeit', 'however', 'inasmuch', 'indeed', 'indicate', 'indicated', 'indicates', 'inner', 'insofar', 'instead', 'into', 'inward', 'itself', 'just', 'keep', 'keeps', 'kept', 'knows', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'like', 'liked', 'likely', 'look', 'looking', 'looks', 'mainly', 'many', 'maybe', 'meanwhile', 'more', 'moreover', 'most', 'mostly', 'much', 'must', 'myself', 'name', 'namely', 'need', 'needs', 'neither', 'never', 'nevertheless', 'next', 'none', 'normally', 'admittedly', 'consequently', 'finally', 'furthermore', 'however', 'indeed', 'instead', 'likewise', 'meanwhile', 'moreover', 'nevertheless', 'nonetheless', 'notwithstanding', 'otherwise', 'overall', 'particularly', 'similarly', 'subsequently', 'therefore', 'thus', 'ultimately', 'undoubtedly', 'whereas', 'yet', 'amid', 'atop', 'beneath', 'inside', 'opposite', 'past', 'underneath'}

def buildTrie():
    sanitizeDictionary()
    sortDictionary() # separates parts of speech
        
    # pos == part of speech
    for posWords in os.listdir('sortedPOSLists'):
        makeJsonFile(posWords)

# removes: length < 4, plurals, useless words, scientific language, proper noun, conjunction, preposition, interjection, sounds effects
def sanitizeDictionary():
    for wordListFile in os.listdir('dictionary/src'):
        wordList = open(f'dictionary/src/{wordListFile}', encoding='utf-8')
        words = wordList.read().split("\n")
        wordList.close()

        os.remove(f'dictionary/sanitized/{wordListFile}')
        sanitizedWordList = open(f'dictionary/sanitized/{wordListFile}', 'a')

        for word in words:
            print(word)
            if len(word) > 3 and word.isascii() and not word in uselessWords:
                sanitizedWordList.write(word + "\n")

        sanitizedWordList.close()

def sortDictionary():
    for wordListFile in os.listdir('dictionary/sanitized'):
        wordList = open(f'dictionary/src/{wordListFile}')
        words = wordList.read()
        wordList.close()
        pos_tags = nltk.pos_tag(words.word_tockenize())
        for word in pos_tags:
            
    

# def makeJsonFile(inputFile):
    
sanitizeDictionary()