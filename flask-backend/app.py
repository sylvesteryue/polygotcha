import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

import vision_api

UPLOAD_FOLDER = os.getcwd() + '/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def home():
    pass

@app.route("/upload", methods=['POST'])
def upload_image():
    target = os.path.join(UPLOAD_FOLDER)

    if not os.path.isdir(target):
        os.mkdir = target

    file = request.files['file']

    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    response="Whatever you wish too return"
    
    return vision_api.object_detect(file)

if __name__ == '__main__':
    app.run(debug=True)