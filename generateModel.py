import os
import re
import json
import time

def makeModel(corpusFile):
    model = {}
    # Example model
    # {
    #   'a': {
    #    'b': 1,
    #    'c': 3,
    #    'd': 1,
    #   },
    #   'b': {
    #    'a': 3,
    #    'c': 1,
    #    'd': 2,
    #   },
    # }
    # This means that 'a' is followed by 'b' 1 time, 'c' 3 times, and 'd' 1 time

    names = corpusFile.read().splitlines()
    for name in names:
        # remove all non-letter characters and convert to lowercase
        name = re.sub(r'[^a-zA-Z]', '', name).lower()

        # creates an entry for the most likely first letter
        # if the letter is not in the model, add it
        model[" "] = model.get(" ", {})
        # update next letter count
        model[" "][name[0]] = model[" "].get(name[0], 0) + 1

        # creates probability model that maps each letter to the next letter's probability
        for i in range(1, len(name)):
            # if the letter is not in the model, add it
            model[name[i-1]] = model.get(name[i-1], {})
            # update next letter count
            model[name[i-1]][name[i]] = model[name[i-1]].get(name[i], 0) + 1
    return model

def updateMasterModel(masterModel, model):
    for letter in model:
        masterModel[letter] = masterModel.get(letter, {})
        for nextLetter in model[letter]:
            masterModel[letter][nextLetter] = masterModel[letter].get(nextLetter, 0) + model[letter][nextLetter]
    return masterModel

def writeModels():
    st = time.time()

    masterModel = {}

    for corpus in os.listdir('nameModel/corpus'):
        with open(f'nameModel/corpus/{corpus}', encoding="utf-8") as corpusFile, open(f'nameModel/models/{corpus[:-4]}.json', 'w') as modelFile:
            model = makeModel(corpusFile)
            masterModel = updateMasterModel(masterModel, model)
            json.dump(model, modelFile)

    with open('nameModel/models/masterModel.json', 'w') as masterModelFile:
        json.dump(masterModel, masterModelFile)

    et = time.time()
    print(f'main finished in {et - st:.3f}')

writeModels()