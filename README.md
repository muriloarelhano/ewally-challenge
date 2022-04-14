# Ewally Challenge

## Architecture

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design.
It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters.
This makes components exchangeable at any level and facilitates test automation.

### Twelve Factor App

The project was designed following the standards of [The Twelve Factors](https://12factor.net/)

## Key features

- I18n translations
- Get code bar, amount and expiration date from line code
- Cache information by line code consult

# Running Application

## Docker (Recommended)

to run the application with docker, clone the project on your machine, as in the previous tutorial, now just run docker-compose command:

> docker-compose up -d

after the docker image has finished building and the application is running inside the container, call the API from

> http://localhost:3000/ticket/:lineCode

## Nodejs on machine

First, install NodeJs in your machine, [Nodejs Official Download](https://nodejs.org/en/download/), clone this project with:

> git clone https://github.com/muriloarelhano/ewally-challenge.git

Install dependencies with npm and run application in development mode:

> npm install

> npm run start:dev

OBS: You need run redis in docker container without password and running with default port () to connect

# API

To use API just call route with `GET` method:

> http://localhost:3000/ticket/:lineCode

where `lineCode` is code of "Linha Digitável"

# Tests

This project has configured for accept 70% of code coverage, just run jest command
to execute unit tests:

> npm run test

### Extra documentation

Extra documentation such as, OpenAPI description file and postman workspace file for import is in a folder called `documentation` in project root.
