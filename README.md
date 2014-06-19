# Bookmark Manager


A WORK IN PROGRESS!!!
WHILE THIS APP IS WORKING AND MAY BE TRIED OUT IT IS NOT COMPLETE!!!!



## Description

The client code has been taken from [Kevin Delemme](https://github.com/kdelemme/angularjs-bookmark-manager)

As Kevin puts it: "Bookmark Manager is a simple web application that allows you to save your bookmarks, associate tags to bookmarks and search for bookmarks."


I made the following changes:

* Added BOWER client package manager
* Arranged the client code to my liking 
* Added a HTML5 select element where multiple tag options may be added to a bookmark
* Added user authentication using JSON Web Tokens
* Added connection to MongoDB
* Added RESTful routes for client to interact with server via $http service (AJAX calls using JSON)



# Requirements

* MongoDB running
* Node
* bower client package manager


## Installation

* Clone the Repository
* npm install - install all the node packages listed in the package.json file 
* bower install - installs the front end packages listed in the bower.json file
* Turn on MongoDB
* Open ../server/config/database.js and enter Mongo database details
* node server.js - start up Node\Express server
* Browse to http://localhost:3080



## Technologies Used
 
Node, Express, Angular, Mongoose, MongoDB, Robomongo MongoDB client, REST API, Bower, Bcryptjs,
$http service to make AJAX requests over JSON in AngularJS.



Michael Cullen
2014
