# Simple Rest Movie API

This API serves data received from [OMDB API](http://www.omdbapi.com/) and saved in application's database.   
Applications source code contains free, limited OMDB API key.   
Public demo: [CLICK](https://simple-rest-movie-api.herokuapp.com/)

------

## Available routes:

| Route         | Type | Parameters | Description                                                  |
| ------------- | ---- | ---------- | ------------------------------------------------------------ |
| /movies       | GET  | NONE       | Retrieves all movies saved in app's database, responds with empty array, if database is empty. |
| /movies       | POST | title      | Searches OMDB for specified title, checks for movie's occurrence in database and responds with movie object. |
| /comments     | GET  | NONE       | Retrieves all comments saved in app's database, responds with empty array, if database is empty. |
| /comments/:id | GET  | id         | Retrieves all comments for specified IMDB ID.                |
| /comments     | POST | id, text   | Adds comment, if specified id (IMDB ID) was found in the database. |

------

## Project Structure

- /models - contains MongoDB models
- /routes - contains route-related logic
- /test - contains tests
- app.js - main file

------

## Setup

1. Clone/download app to your PC
2. Run npm install inside app's folder
3. If you're not satisfied with default settings, you can change MongoDB URI and application's port using env variables, PORT for app's port and DBHOST for MongoDB URI.
4. Start app with npm start

------

## Tests

After installation you can simply run npm test :)

##### By Mateusz Przybyłowicz 

