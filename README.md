You can test the app here: http://sann-tid.appspot.com

How to start the project server:
===============================

Windows:
--------

### Start with "The World's Smallest Web Server":
1. Run this command in the project folder: `twsws.exe -p 8000 html`
2. Access the webpage at http://localhost:8000

Linux/Mac:
----------

### Start with the python webserver:
1. Run this command in the "html/" folder inside the project folder: `python -m SimpleHTTPServer`
2. Access the webpage at http://localhost:8000

Advanced:
---------

### Start it with Google App Engine (Linux/Mac/Windows):
1. Download and install the SDK: https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python
2. Add it to your PATH
3. Run this command in the project folder: `dev_appserver.py .`
4. Access the webpage at http://localhost:8080
5. To upload the project when you are done you need to edit the app.yaml file with your app-id and run the `appcfg.py update .` command


