import os
from flask import Flask, jsonify, request, json
from flask_restful import Api
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename

import vision_api
import translate_api

from resources.tested_word import WordCreator, Word, WordList

UPLOAD_FOLDER = os.getcwd() + '/uploads'

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/polygotcha'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


api = Api(app)

api.add_resource(WordCreator, '/createword')
api.add_resource(Word, '/word/<string:id>')
api.add_resource(WordList, '/words')


@app.route("/translate", methods=['POST'])
def get_translated_word():
    word = request.get_json()['word_id']
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

    return json.dumps({"objects_in_image": objects})

if __name__ == '__main__':
    from db import mongo
    mongo.init_app(app)
    app.run(debug=True)