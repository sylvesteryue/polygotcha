from flask_restful import Resource, reqparse
from bson import json_util
from bson.objectid import ObjectId
from db import mongo

class SubmittedImage(Resource):
    parser = reqparser.RequestParser()

    parser.add_argument('word',
                        type=str,
                        required=True,
                        help="word cannot be left blank!")

    def post(self):
        pass