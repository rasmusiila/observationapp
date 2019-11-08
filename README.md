# Observationapp

## Description

This is a simple web application that allows users to record their observations of birds.

Below you can find the instructions for running the application.

Check out `observationapp-worklog.txt` to get more insight about the developing process of the project.

### Views

The application consists of two main views: Observations and Observation Form. One designed to display a list of all the submitted observations. The other allows users to submit a new observation.

### Technologies

This application was made using Angular CLI version 8.3.15.

Angular MDB (Material Design for Bootstrap) was used to enhance views.

AngularFire (https://github.com/angular/angularfire) was used to store the images. - Images are stored to a public FireBase project's storage made for this application.

This application is not connected to a backend, so LocalStorage was used to store data about observations. - Data will be persisted only within your browser.

### Testing

Unit tests were mainly written for Services. Due to the time limit, not everything was thoroughly tested. Every spec file was at least configured so that at least one test passed in each spec file.

E2E tests have not been implemented.

### CI

Travis CI was used to run tests automatically. https://travis-ci.org/rasmusiila/observationapp

## Setup & Running

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.15.

The easiest way to run the project is to use WebStorm's Check out from source control functionality.

Once you have the project, navigate to the root folder and execute `npm i` - WebStorm asks you if it can do it automatically.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If using WebStorm you can also run using the `Angular CLI Server` configuration.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

If using WebsTorm you can also run unit tests by using the `Tests (observationapp)` configuration.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

