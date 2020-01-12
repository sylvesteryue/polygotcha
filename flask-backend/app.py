import os
from flask import Flask, jsonify, request, json
from flask_restful import Api
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

from bson.objectid import ObjectId

from db import mongo

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

CORS(app, expose_headers='Authorization')


@app.route("/translate", methods=['POST'])
def get_translated_words():
    word = request.get_json()['word_id']
    language = request.get_json()['language']

    translated_word = translate_api(word, language)




@app.route("/upload", methods=['POST'])
def upload_image():
    target = os.path.join(UPLOAD_FOLDER)
    #print(request.form['options'])
    if not os.path.isdir(target):
        os.mkdir = target

    file = request.files['file']

    word_option = request.form['option']

    print(word_option)

    filename = secure_filename(file.filename)

    destination = "/".join([target, filename])
    file.save(destination)    
    objects = vision_api.object_detect(destination)

    os.remove(destination)

    check_for_objects(word_option, objects)

    return {"objects": objects}


def check_for_objects(word_option, objects):
    col = mongo.db.words

    for word_doc in col.find():
        if word_doc['_id'] == ObjectId(word_option) and word_doc['word'] in objects:
            mongo.db.words.update_one({
                '_id': word_doc['_id']
                },{
                    '$set': {
                        'correctness': True
                    }
                }, upsert=False)

def set_words_false():
    col = mongo.db.words

    for word_doc in col.find():
        mongo.db.words.update_one({
            '_id': word_doc['_id']
            },{
                '$set': {
                    'correctness': False
                }
            }, upsert=False)


if __name__ == '__main__':
    mongo.init_app(app)
    set_words_false()
    app.run(debug=True)