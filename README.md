# Slide Tracking
Slide tracking is a software developed for the Bio Sciences department, it's a simple interface to manage and track lab slides.
[https://slide-tracking.qatar.cmu.edu](https://slide-tracking.qatar.cmu.edu)

# Deployment
- Caddy Webserver
```
$ caddy start
$ caddy stop
```
- NPM
```
$ npm run deploy 
# Alternatively use build and then deploy with pm2 
$ npm run build
$ pm2 start ./build/index.js
# You can also build as follows, this method will run 
# at http://slide-tracking-01.qatar.cmu.edu:3000 and is only for fast checkups
# google auth will not work
$ node ./build/index.js 
```
