import os
from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename

import vision_api
import translate_api

UPLOAD_FOLDER = os.getcwd() + '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def home():
    pass

@app.route("/translate", methods=['POST'])
def get_translated_word():
    word = request.get_json()['word']
    language = request.get_json()['language']

    translated_word = translate_api(word, language)


@app.route("/upload", methods=['POST'])
def upload_image():
    target = os.path.join(UPLOAD_FOLDER)

    if not os.path.isdir(target):
        os.mkdir = target

    file = request.files['file']

    filename = secure_filename(file.filename)

    destination = "/".join([target, filename])
    file.save(destination)    
    objects = vision_api.object_detect(destination)

    os.remove(destination)

    return {"objects_in_image": objects}

if __name__ == '__main__':
    app.run(debug=True)