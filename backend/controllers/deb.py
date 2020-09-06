import json
# import sys
# import cv2
# import numpy as np
# from colorama import Fore, Back
from tensorflow.keras.models import model_from_json
print("imported tensorflow")

def main():
    test_dic = {
        "name": "radioactive"
    }
    print(json.dumps(test_dic))


if __name__ == "__main__":
    main()