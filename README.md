# Ewally Challenge

## Architecture

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design. 
It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. 
This makes components exchangeable at any level and facilitates test automation.

## Key features 

* I18n translations 

# Running Application

## Nodejs on machine

First, install NodeJs in your machine, [Nodejs Official Download](https://nodejs.org/en/download/), clone this project with:

> git clone https://github.com/muriloarelhano/ewally-challenge.git

Install dependencies with npm:

> https://github.com/muriloarelhano/ewally-challenge.git


## Docker

to run the application with docker, clone the project on your machine, as in the previous tutorial, now just run docker-compose command:

> docker-compose up -d

after the docker image has finished building and the application is running inside the container, call the API from 

> http://localhost:3000/ticket/:code

### Extra documentation

Extra documentation such as, OpenAPI description file and postman workspace file for import is in a folder called `documentation` in project root.