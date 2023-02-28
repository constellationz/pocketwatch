#!/usr/bin/bash
# Generate SSL certificate to sslcert/server.key and sslcert/server.cert

SSLDIR="$(dirname 0)/../sslcert/"

mkdir -p "$SSLDIR"

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $SSLDIR/server.key -out $SSLDIR/server.crt
