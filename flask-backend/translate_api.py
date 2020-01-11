#set 
from google.cloud import translate_v2 as translate
client = translate.Client()

def translate(word, target):
    #word = word.decode('utf-8')
    result = client.translate(word, target_language=target)

    print(result['translatedText'])

if __name__ == '__main__':
    translate('hi', 'es')

