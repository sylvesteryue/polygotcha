from google.cloud import storage

def create_bucket(bucket_name):
    """Creates a new bucket."""
    # bucket_name = "your-new-bucket-name"

    storage_client = storage.Client()

    bucket = storage_client.create_bucket(bucket_name)

    print("Bucket {} created".format(bucket.name))

def upload_image(bucket_name, source_file_name, destination_blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

if __name__ == '__main__':
    #create_bucket('test')
    upload_image('image-for-translation', '/Users/sylvester/Desktop/sylvester_head_shot.jpg', 'test_image' )
