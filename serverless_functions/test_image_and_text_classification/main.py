import os
from google.cloud import firestore
from google.cloud import vision
from google.cloud import language_v1
from google.api_core.exceptions import ResourceExhausted
from flask import jsonify
import time

# Initialize clients
vision_client = vision.ImageAnnotatorClient()
language_client = language_v1.LanguageServiceClient()

# Helper function for exponential backoff
def exponential_backoff_retry(func, *args, **kwargs):
    max_retries = 5  # Maximum number of retries
    base_wait_time = 1  # Initial wait time in seconds; adjust as appropriate
    for i in range(max_retries):
        try:
            return func(*args, **kwargs)
        except ResourceExhausted as e:
            if i == max_retries - 1:
                raise e  # Raise the exception if the last retry fails
            wait_time = base_wait_time * (2 ** i)  # Exponential backoff formula
            print(f"Rate limit exceeded. Waiting for {wait_time} seconds before retrying...")
            time.sleep(wait_time)

def classify_image(image_url):
    response = exponential_backoff_retry(
        vision_client.safe_search_detection,
        {'source': {'image_uri': image_url}}
    )
    safe_search = response.safe_search_annotation
    return 'hate' if (safe_search.adult >= vision.Likelihood.POSSIBLE or
                      safe_search.violence >= vision.Likelihood.POSSIBLE) else 'not hate'

def classify_text(text_content):
    document = language_v1.Document(content=text_content, type_=language_v1.Document.Type.PLAIN_TEXT)
    response = exponential_backoff_retry(
        language_client.analyze_sentiment,
        request={'document': document}
    )
    sentiment = response.document_sentiment
    return 'hate' if sentiment.score < -0.5 else 'not hate'

def test_image_and_text_classification(request):
    firestore_client = firestore.Client()
    document_ref = firestore_client.collection('Posts').document()
    document_ref.set({
        'imageURL': 'http://example.com/image.jpg',
        'connectedPostImageURL': 'http://example.com/connected_image.jpg',
        'caption': 'Sample caption'
    })
    
    document = document_ref.get()

    if not document.exists:
        print(f"Document not found.")
        return jsonify({"result": "Document not found"}), 404

    post_data = document.to_dict()
    connected_image_url = post_data.get('connectedPostImageURL')
    image_url = post_data.get('imageURL')
    caption = post_data.get('caption')
    
    classification = 'not hate'

    # Use the 'classify_image' function with exponential backoff for connected images
    if connected_image_url:
        connected_classification = classify_image(connected_image_url)
        if connected_classification == 'hate':
            classification = 'hate'

    # Use the 'classify_image' function with exponential backoff for primary images
    if image_url and classification != 'hate':
        image_classification = classify_image(image_url)
        if image_classification == 'hate':
            classification = 'hate'

    # Use the 'classify_text' function with exponential backoff for text classification
    if caption:
        text_classification = classify_text(caption)
        if text_classification == 'hate':
            classification = 'hate'
    
    document_ref.update({'classification': classification})
    print(f"Document classified as {classification}.")
    return jsonify({"result": f"Document classified as {classification}."})



# import os
# from google.cloud import firestore
# from google.cloud import vision
# from google.cloud import language_v1
# from flask import jsonify
# import time

# vision_client = vision.ImageAnnotatorClient()
# language_client = language_v1.LanguageServiceClient()

# def test_image_and_text_classification(request):
#     firestore_client = firestore.Client()
#     document_ref = firestore_client.collection('Posts').document()
#     document_ref.set({
#         'imageURL': 'http://example.com/image.jpg',
#         'connectedPostImageURL': 'http://example.com/connected_image.jpg',
#         'caption': 'Sample caption'
#     })
    
#     document = document_ref.get()

#     if not document.exists:
#         print(f"Document not found.")
#         return jsonify({"result": "Document not found"}), 404

#     post_data = document.to_dict()
#     connected_image_url = post_data.get('connectedPostImageURL')
#     image_url = post_data.get('imageURL')
#     caption = post_data.get('caption')
    
#     classification = 'not hate'

#     def classify_image(image_url):
#         response = vision_client.safe_search_detection({
#             'source': {'image_uri': image_url}
#         })
#         safe_search = response.safe_search_annotation

#         return 'hate' if (safe_search.adult >= vision.Likelihood.POSSIBLE or
#                           safe_search.violence >= vision.Likelihood.POSSIBLE) else 'not hate'

#     if connected_image_url:
#         connected_classification = classify_image(connected_image_url)

#         if connected_classification == 'hate':
#             classification = 'hate'

#     if image_url and classification != 'hate':
#         image_classification = classify_image(image_url)

#         if image_classification == 'hate':
#             classification = 'hate'

#     def classify_text(text_content):
#         document = language_v1.Document(content=text_content, type_=language_v1.Document.Type.PLAIN_TEXT)
#         response = language_client.analyze_sentiment(request={'document': document})
#         sentiment = response.document_sentiment
       
#         return 'hate' if sentiment.score < -0.5 else 'not hate'  

#     if caption:
#         text_classification = classify_text(caption)

#         if text_classification == 'hate':
#             classification = 'hate'
    
#     document_ref.update({'classification': classification})
#     print(f"Document classified as {classification}.")
#     return jsonify({"result": f"Document classified as {classification}."})

