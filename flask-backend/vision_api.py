import io
import os

from google.cloud import vision


def object_detect(file):
    client = vision.ImageAnnotatorClient()
    file_name = os.path.abspath(file)

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    objects = client.object_localization(image=image).localized_object_annotations

    object_names = [object.name for object in object]

    print('Objects:')
    for object in objects:
        print("{}, score: {}".format(object.name, object.mid))

    return object_names

if __name__ == '__main__':
    label_detect('/Users/sylvester/Desktop/sylvester_head_shot.jpg')



