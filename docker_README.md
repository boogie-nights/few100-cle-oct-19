# Some Notes for Deploying with Docker

First, do `npm run build` - this will build your application, putting the html, javascript, css, etc. in the `.\dist` directory.

## To Build the Docker Image

Run `docker build -t few100docker .` (don't forget the period (.) at the end.)

After that succeeds, if you type `docker images` you should see the new image generated.



### To Run Your Docker Image

To start your docker image, do this:

`docker run --name few100content -d -p 8090:80 few100docker`

You can them run `docker ps` and it should show your docker app running. The web server we are building from uses [NGINX](https://www.nginx.com) as a web server, and we are telling it to expose it's port 80 as port 8090 to the outside world.

Go to a browser and type `http://localhost:8090` in the address bar and you will see your application.

## Additional Notes

### Stopping a Docker App

After you are done patting yourself on the back, you can stop your running docker application with the following command:

`docker stop few100content`


### Removing a Docker Image

If you should need to remove a docker image, you can do the following:

Use the name in the `docker images` output, issue the following command.

`docker rmi few100docker`

(you may need to use the `-f` force option if it fails).
