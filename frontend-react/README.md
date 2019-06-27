# Application built with react
# ReactUI & Kubernetes DevOps Helm

# Pre-req
- Deploy backend service using helm charts first

# Run following command inside ./helm directory
- helm install ./charts/ -f ./charts/values.yaml -n frontend

# Run following command to get service public IP
- kubectl get svc -w

# Run following command to delete helm release
- helm del --purge frontend


##### Run the app

# Pre-req
- Run flask backend server first using `python app-flask.py`.

```bash
$ npm run bundle
$ npm start
```

##### Docker
To build the image, run Docker build from a command line or terminal that is in the root directory of the application.
```
docker build --tag athertahir/frontend-react .
docker push athertahir/frontend-react
```