# Flask REST API

# Kubernetes DevOps Helm

### Setup(With Helm):
# Run following command inside ./helm directory
- helm install ./charts/ -f ./charts/values.yaml -n backend

# Run following command to delete helm release
- helm del --purge backend


##### Create the virtualenv
```cmd
$ python -m venv flask-backend
$ cd flask-backend
$ Scripts\activate.bat
```

##### Install dependencies
```bash
$ pip install -r requirements.txt
$ pip list
```

##### pep8
```cmd
$ pep8 --first --show-source app-flask.py
$ pep8 --first --show-source ./api
```


##### Run the app
```bash
$ python app-flask.py
```

##### Docker
To build the image, run Docker build from a command line or terminal that is in the root directory of the application.
```
docker build --tag athertahir/flask-backend .
docker push athertahir/flask-backend
```

You can run the image as a container.
```
docker run --name python-app -p 5000:5000 athertahir/flask-backend
```
