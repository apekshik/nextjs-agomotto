import time
import threading
import queue
import firebase_admin
from firebase_admin import firestore
import matplotlib.pyplot as plt

firebase_admin.initialize_app()
db = firestore.client()

def insert_document_and_wait_for_output(document_data, results_queue):
    start_time = time.perf_counter()
    _, doc_ref = db.collection('Posts').add(document_data)

    while True:
        updated_doc = doc_ref.get()
        if updated_doc.exists and updated_doc.to_dict().get('classification'):
            break
        #time.sleep(0.1)  # Short delay to avoid rapid polling

    latency = time.perf_counter() - start_time
    results_queue.put(latency)

def throughput_test(document_data, insertions_per_second, duration_seconds):
    results_queue = queue.Queue()
    threads = []
    start_time = time.perf_counter()

    for _ in range(insertions_per_second * duration_seconds):
        thread = threading.Thread(target=insert_document_and_wait_for_output, args=(document_data, results_queue))
        threads.append(thread)
        thread.start()
        time.sleep(1 / insertions_per_second)

    for thread in threads:
        thread.join()

    end_time = time.perf_counter()
    total_duration = end_time - start_time

    total_latency = sum(results_queue.queue)
    count = len(results_queue.queue)
    average_latency = total_latency / count if count else 0

    throughput = count / total_duration

    print(f"Throughput: {throughput:.2f} insertions per second")
    print(f"Average Latency: {average_latency:.5f} seconds")

    return throughput, average_latency

mock_document = {
    'caption': 'Example caption',
    'imageURL': 'http://example.com/image.jpg',
    'connectedPostImageURL': 'http://example.com/connected_image.jpg'
}

duration_seconds = 1
max_throughput = 20
step = 1

throughput_data = []
latency_data = []

for insertions_per_second in range(1, max_throughput + 1, step):
    print(f"Testing {insertions_per_second} insertions per second")
    throughput, latency = throughput_test(mock_document, insertions_per_second, duration_seconds)
    throughput_data.append(throughput)
    latency_data.append(latency)

plt.figure(figsize=(12, 6))
plt.plot(throughput_data, latency_data, marker='o')
plt.title('Throughput vs Average Latency')
plt.xlabel('Throughput (insertions per second)')
plt.ylabel('Average Latency (seconds)')
plt.grid(True)
plt.show()

# import time
# import threading
# import queue
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore

# #cred = credentials.Certificate('C:/Users/micha/AppData/Roaming/gcloud/application_default_credentials.json')
# firebase_admin.initialize_app()
# db = firestore.client()

# # Function to insert a document and measure latency
# def insert_document(document_data, results_queue):
#     start_time = time.perf_counter()
#     # Add a new document
#     _, doc_ref = db.collection('Posts').add(document_data)
#     # Measure the latency
#     latency = time.perf_counter() - start_time
#     results_queue.put(latency)

# # Function to perform a throughput test
# def throughput_test(document_data, insertions_per_second, duration_seconds):
#     results_queue = queue.Queue()
#     threads = []
#     for _ in range(insertions_per_second * duration_seconds):
#         # Create a thread for each insertion
#         thread = threading.Thread(target=insert_document, args=(document_data, results_queue))
#         threads.append(thread)
#         thread.start()
#         time.sleep(1 / insertions_per_second)
    
#     # Wait for all threads to complete
#     for thread in threads:
#         thread.join()
    
#     # Calculate average latency
#     total_latency = 0
#     count = 0
#     while not results_queue.empty():
#         total_latency += results_queue.get()
#         count += 1
#     average_latency = total_latency / count if count else None
    
#     print(f"Average latency over {count} insertions: {average_latency:.4f} seconds")
#     print(f"Throughput: {count / duration_seconds} insertions per second")

# # Define your mock document data
# mock_document = {
#     'caption': 'Example caption',
#     'imageURL': 'http://example.com/image.jpg',
#     'connectedPostImageURL': 'http://example.com/connected_image.jpg'
# }

# # Run the throughput test
# # Example: 5 insertions per second over 10 seconds
# throughput_test(mock_document, insertions_per_second=5, duration_seconds=10)
