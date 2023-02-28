#!/usr/bin/bash
# Generate SSL certificate to sslcert/server.key and sslcert/server.cert

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

echo "Output certificate to server.key and server.crt"
echo "Make sure to move these files to a directory called sslcert next to the package.json file"
