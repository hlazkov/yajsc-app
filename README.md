# Yet another JS course service

## About:
This is kind of proof of concept for a REST service written with Node.js and 
express. It should provide API for educational purposes.

### Features:

 - [x] Start this project
 - [ ] User management system
 - [ ] Tracking of homeworks progress
 - [ ] Moving students to different streams of a course
 - [ ] Auth with ... ?
 - [ ] Live chat (WS?)
 - [ ] Live integration with github + github actions => check run status, check review status
 - TODO: add features here

## How to run

 * Install docker for your OS: [Link](https://www.docker.com/)
 * Open terminal / cmd in this directory
 * run command `docker-compose up`
 * Service should run at port 3000 on your PC
 * Swagger should be accessible at [http://localhost:3000/swagger](http://localhost:3000/swagger)
 * Once you are ready to stop the service, just press control+C
 * Access to db: 
   * I would suggest using [dbeaver](https://dbeaver.io/download/), but you could choose any tool you like 
   * By default port is `5432`
   * username is `postgres`
   * password is `password` (yeah, its secure enough)
   * database name is `postgres`
   * host/path should be `localhost`
