from flask_restful import Resource, reqparse
from bson import json_util
from bson.objectid import ObjectId
from db import mongo

import traceback

class WordCreator(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('word',
                        type=str,
                        required=True,
                        help="word cannot be left blank!")

    # parser.add_argument('translation',
    #                     type=str,
    #                     required=True,
    #                     help="translation cannot be left blank!")

    parser.add_argument('correctness',
                        type=bool,
                        required=True,
                        help="correctness cannot be left blank!")

    def post(self):
        data = WordCreator.parser.parse_args()

        try:
            word_id = mongo.db.words.insert_one({
                "word": data['word'],
                "translation": data['word'],
                "correctness": data['correctness']
            }).inserted_id
            word_created = mongo.db.words.find_one({"_id": word_id})
        except:
            return {'message': 'An error occured inserting the word'}, 500
        
        return json_util._json_convert(word_created), 201

class Word(Resource):
    def get(self, id):
        word = mongo.db.words.find_one({"_id": ObjectId(id)})
        if word:
            return json_util._json_convert(word), 200

        return {'message': 'Word not found'}, 404
    
    def delete(self, id):
        try:
            word = mongo.db.words.find_one({"_id": ObjectId(id)})
        except:
            return {'message': 'An error occured trying to look up this word'}, 500

        if word:
            try:
                mongo.db.words.delete_one({"_id": ObjectId(id)})
            except:
                return {'message': 'An error occured trying to delete this word'}, 500
            return {'message': 'word was deleted'}, 200

        return {'message': 'word not found'}, 404


class WordList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('words',
                        type=dict,
                        required=True,
                        action='append',
                        help="Words field cannot be left blank!"
                        )

    def get(self):
        try:
            words = mongo.db.words.find()
        except:
            return {'message': 'An error occured trying to look up these words'}, 500

        return json_util._json_convert(words), 200

    def post(self):
        data = WordCreator.parser.parse_args()

        try:
            words_created = []
            for word in data['words']:
                word_id = mongo.db.words.insert_one({
                "word": data['word'],
                "translation": data['word'],
                "correctness": data['correctness']
                }).inserted_id
                word_created = mongo.db.words.find_one(
                    {"_id": word_id})
                words_created.append(mongo.db.words.find_one({"_id": word_id}))
        except:
            return {'message': 'An error occured creating the words'}, 500

        return json_util._json_convert({"words": words_created}), 201
                



