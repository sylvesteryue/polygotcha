import io
import os

from google.cloud import vision
from google.cloud.vision import types

client = vision.ImageAnnotatorClient()

def label_detect(file):
    file_name = os.path.abspath(file)

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations

    print('Labels:')
    for label in labels:
        print(label.description)

if __name__ == '__main__':
    label_detect('/Users/sylvester/Desktop/sylvester_head_shot.jpg')



