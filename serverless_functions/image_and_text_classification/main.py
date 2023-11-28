import os
from google.cloud import firestore
from google.cloud import vision
from google.cloud import language_v1

vision_client = vision.ImageAnnotatorClient()
language_client = language_v1.LanguageServiceClient()

def image_classification(event, context):
    document_id = context.resource.split('/documents/')[1].split('/')[1]

    firestore_client = firestore.Client()
    
    document_ref = firestore_client.collection('Posts').document(document_id)
    document = document_ref.get()
    
    if not document.exists:
        print(f"Document with ID {document_id} not found.")
        return

    post_data = document.to_dict()
    connected_image_url = post_data.get('connectedPostImageURL')
    image_url = post_data.get('imageURL')
    caption = post_data.get('caption')
    
    classification = 'not hate'

    def classify_image(image_url):
        response = vision_client.safe_search_detection({
            'source': {'image_uri': image_url}
        })
        safe_search = response.safe_search_annotation

        return 'hate' if (safe_search.adult >= vision.Likelihood.POSSIBLE or
                          safe_search.violence >= vision.Likelihood.POSSIBLE) else 'not hate'

    if connected_image_url:
        connected_classification = classify_image(connected_image_url)

        if connected_classification == 'hate':
            classification = 'hate'

    if image_url and classification != 'hate':
        image_classification = classify_image(image_url)

        if image_classification == 'hate':
            classification = 'hate'

    def classify_text(text_content):
        document = language_v1.Document(content=text_content, type_=language_v1.Document.Type.PLAIN_TEXT)
        response = language_client.analyze_sentiment(request={'document': document})
        sentiment = response.document_sentiment
       
        return 'hate' if sentiment.score < -0.5 else 'not hate'  

    if caption:
        text_classification = classify_text(caption)

        if text_classification == 'hate':
            classification = 'hate'
    
    document_ref.update({'classification': classification})
    print(f"Document with ID {document_id} classified as {classification}.")

