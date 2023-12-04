#!/bin/bash
function_endpoint="YOUR_FUNCTION_ENDPOINT_URL"
for i in {1..50}; do
  curl -s "$function_endpoint" &
done
wait
