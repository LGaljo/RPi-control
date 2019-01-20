# RPi-control

Website created on Node.js framework.<br>
It's used to toggle switches on Raspberry Pi and is 
secured with HTTPS and self-signed certificate.<br>

How to compile self-signed certificate?<br>
Visit this site:<br>
https://www.akadia.com/services/ssh_test_certificate.html<br>
Put created server.key and server.crt into sslcert folder on root of project

## Installation
Prerequisites: NodeJS, Python 2.7
1. Download sources and enter that folder
2. In terminal run npm install to download node modules
3. Create file <code>.env</code> in root of project with lines defining environment variables:  
<code>ON_RPI=true  
SECURE_PORT=443  
UNSECURE_PORT=80  
SESSION_SECRET=<session-secret>  
If you want to run locally, set ON_RPI to false and define ports with 8443 and 8080  
4. Run with <code>npm start</code>
