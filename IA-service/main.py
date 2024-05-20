import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import easyocr

app: Flask = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return "Welcome to my Flask server!"


@app.route('/detect_keywords', methods=['POST'])
def detect_keywords():
    image_file = request.files['image']
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    reader = easyocr.Reader(['en'], gpu=False)
    results = reader.readtext(image)

    keywords = ['psychiatre', 'diplôme']
    found_keywords = []
    verif = False

    for (bbox, text, score) in results:
        for keyword in keywords:
            if keyword.lower() in text.lower():
                found_keywords.append(keyword)
        start_point = (int(bbox[0][0]), int(bbox[0][1]))
        end_point = (int(bbox[2][0]), int(bbox[2][1]))
        cv2.rectangle(image, start_point, end_point, (0, 255, 0), 2)
        cv2.putText(image, text, (start_point[0], start_point[1] - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 0),
                    2)

    if found_keywords:
        verif = True

    response = {
        "found_keywords": found_keywords,
        "verif": verif
    }
    return jsonify(response)


@app.route('/verif_association', methods=['POST'])
def verif_association():
    image_file = request.files['image']
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    reader = easyocr.Reader(['en'], gpu=False)
    results = reader.readtext(image)

    keywords = ['Fiscale', 'Carte']
    found_keywords = []
    verif = False

    for (bbox, text, score) in results:
        for keyword in keywords:
            if keyword.lower() in text.lower():
                found_keywords.append(keyword)
        start_point = (int(bbox[0][0]), int(bbox[0][1]))
        end_point = (int(bbox[2][0]), int(bbox[2][1]))
        cv2.rectangle(image, start_point, end_point, (0, 255, 0), 2)
        cv2.putText(image, text, (start_point[0], start_point[1] - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 0),
                    2)

    if found_keywords:
        verif = True

    response = {
        "found_keywords": found_keywords,
        "verif": verif
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5200)
