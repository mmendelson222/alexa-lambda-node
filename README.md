# alexa-lambda-node
Basic template for an Alexa Lambda application, using the alexa node sdk and gulp for Lambda deployment.

## Installation
 1. clone this repo
 1. edit the config file with your destination Lambda name
 1. Run the following:
```
npm install
npm install --global gulp
```
 1. Deploy using the following:
```
gulp
```

## Notes
 * Create and configure the Lambda in the AWS console before deploying.
 * Add any new Lambda dependencies to gulp-tasks/_upload so they will be included in the zip file.

