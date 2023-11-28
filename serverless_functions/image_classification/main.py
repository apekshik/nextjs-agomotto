import os
from google.cloud import firestore
from google.cloud import vision

vision_client = vision.ImageAnnotatorClient()

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
    
    document_ref.update({'classification': classification})
    print(f"Document with ID {document_id} classified as {classification}.")