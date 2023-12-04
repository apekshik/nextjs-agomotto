
#!/bin/bash
collection_path="C:/Users/micha/Documents/GitHub/nextjs-agomotto/Classification Collection.postman_collection.json"

# Fetch the authentication token
auth_token=$(gcloud auth print-identity-token)

# Create a temporary environment file for Newman
echo "{\"id\": \"my-environment\", \"values\": [{\"key\": \"auth_token\", \"value\": \"$auth_token\"}]}" > temp_env.json

# Run 10 iterations in parallel with the environment file
for i in {1..10}
do
   newman run "$collection_path" --env-var "auth_token=$auth_token" &
done

wait

# Clean up the temporary environment file
rm temp_env.json