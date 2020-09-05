import json
import os
import sys
import cv2
import numpy as np
from colorama import Fore, Back
import tensorflow as tf
from tensorflow.keras.models import model_from_json

#os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

RESULT_LIST = ["Positive, Bacterial", "Negative", "Positive, Viral"]


def create_model(model_file):
    with open(model_file, "r") as json_file:
        loaded_model_json = json_file.read()
        loaded_model_json = model_from_json(loaded_model_json)
    return loaded_model_json


def run_predictions(img_name):
    model = create_model("controllers/utils/pneumonia_model.json")
    model.load_weights("controllers/utils/pneumonia_weights.h5")
    path_to_img = os.path.join("controllers/images/", img_name)
    img = cv2.imread(path_to_img)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (200, 200))
    disease_type = ""
    res = np.argmax(model.predict(img[np.newaxis, :, :]))
    if (res == 0):
        # print(Fore.MAGENTA + Back.BLACK + "Positive, Bacterial")
        disease_type = "Positive, Bacterial"
    elif (res == 1):
        # print(Fore.GREEN + Back.BLACK + "Negative")
        disease_type = "Negative"
    else:
        # print(Fore.CYAN + Back.BLACK + "Positive, Viral")
        disease_type = "Positive, Viral"
    RESULT_DICT = {"name": img_name, "disease_type": disease_type}
    print(json.dumps(RESULT_DICT))
    # return json.dumps(RESULT_DICT)


if __name__ == "__main__":
    # run_predictions("bacterial1.jpeg")
    run_predictions(sys.argv[1])


