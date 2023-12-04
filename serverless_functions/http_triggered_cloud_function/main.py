from google.cloud import firestore
from flask import jsonify
import time

def test_firestore_creation(request):
    firestore_client = firestore.Client()
    document_ref = firestore_client.collection('Posts').document()
    document_ref.set({
        'imageURL': 'http://example.com/image.jpg',
        'connectedPostImageURL': 'http://example.com/connected_image.jpg',
        'caption': 'Sample caption'
    })
    print("Document created")


    timeout = time.time() + 30  
    while time.time() < timeout:
        document = document_ref.get()
        if document.exists:
            document_data = document.to_dict()
            print("Checking document:", document_data)
            if 'classification' in document_data:
                classification = document_data['classification']
                print("Document has been classified:", classification)
                return jsonify({"result": "Document has been classified", "classification": classification})
           
        else:
            print("Document does not exist")
            return jsonify({"result": "Document not found"}), 404

    return jsonify({"result": "Timeout waiting for classification"})
