import json
import pickle
import sys
import warnings

import numpy as np

warnings.filterwarnings('ignore')
from sklearn.preprocessing import StandardScaler


def main(age, bps, chol, thalach, sex_1):
    # age = sys.argv[1]  # age
    # bps = sys.argv[2]
    # chol = sys.argv[3]  # cholesterol in mg/dl
    # thalach = sys.argv[4]  # heart beat rate
    oldpeak = 0
    # sex_1 = sys.argv[5]  # 1:male 0: female
    fbs_1 = 0
    exang_1 = 0
    slope_1 = 1
    slope_2 = 1
    ca_0 = 1
    ca_1 = 0
    ca_2 = 0
    ca_3 = 0
    thal_1 = 1
    thal_2 = 0
    thal_3 = 0
    cp_0 = 1
    cp_1 = 0
    cp_2 = 0
    rest_ecg_0 = 1
    rest_ecg_1 = 0
    vals = np.array([age, bps, chol, thalach, oldpeak, sex_1, fbs_1, exang_1, slope_1, slope_2, ca_0, \
                     ca_1, ca_2, ca_3, thal_1, thal_2, thal_3, cp_0, cp_1, cp_2, rest_ecg_0, rest_ecg_1])

    X = vals.reshape(1, 22)
    sc = StandardScaler()
    X = sc.fit_transform(X)
    # print(os.listdir())
    loaded_model = pickle.load(open('controllers/utils/final_model.sav', 'rb'))
    y_pred = loaded_model.predict(X)
    ans = y_pred[0]
    condition = ""
    if ans:
        condition = "healthy"
    else:
        condition = "not healthy"

    result_dict = {
        "heart_status": condition
    }
    print(json.dumps(result_dict))

if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
    # args: age, blood pressure, cholestrol, heart beat rate, sex
