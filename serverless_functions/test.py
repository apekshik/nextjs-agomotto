import requests
import threading
import time
import matplotlib.pyplot as plt
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Function to call the serverless function
def call_serverless_function():
    url = "https://us-central1-fir-eris.cloudfunctions.net/test_firestore_creation"
    # Assuming the function expects a POST request
    response = requests.post(url, verify=False)
    return response.elapsed.total_seconds()  # Return the response time

# Function to execute multiple calls
def execute_calls(num_calls, results):
    for _ in range(num_calls):
        latency = call_serverless_function()
        results.append(latency)

# Main execution
if __name__ == "__main__":
    avg_latencies = []
    throughputs = []

    operations = 100

    for i in range(10, operations, 10):
        num_threads = 10  # Number of concurrent threads
        calls_per_thread = i

        threads = []
        latencies = []

        start_time = time.time()

        # Start threads
        for _ in range(num_threads):
            thread = threading.Thread(target=execute_calls, args=(calls_per_thread, latencies))
            threads.append(thread)
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        end_time = time.time()
        total_time = end_time - start_time
        total_calls = num_threads * calls_per_thread
        throughput = total_calls / total_time

        avg_latencies.append(sum(latencies) / len(latencies))
        throughputs.append(throughput)

        print(f"Total Calls: {total_calls}")
        print(f"Total Time: {total_time} seconds")
        print(f"Throughput: {throughput} calls per second")
        print(f"Average Latency: {sum(latencies) / len(latencies)} seconds")

    plt.figure(figsize=(10, 6))
    plt.plot(throughputs, avg_latencies, marker="o")

    plt.ylabel("Latency (seconds)")
    plt.xlabel("Throughput (operations / seconds)")
    plt.title("Latency vs. Throughput")
    plt.grid("True")
    plt.legend()
    plt.show()
