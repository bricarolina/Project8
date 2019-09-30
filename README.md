# Project8
# SQL Library Manager

This project uses Sequelize, Express, Pug, Node.js and JavaScript to build a web application that manages a database
of books. 
The user can view the entire list of books, with pagination links to display only 10 books per page. 

Books can be created and updated. 
Error messages will be displayed if the Title, Author or Year fields are invalid.

A search feature is added to allow users to find full or partial matches to their search. 
The search button can be activated with a click or by pressing the enter/return key. 
The pagination links are updated based on the search results. 

If the user's search does not match any names in the list, all books will be hidden and a "No Results" message will appear. 
If the user does not type anything into the input field, and clicks search or presses the enter key, the entire list will be displayed again. 
 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Runs the app in the development mode without having to stop and restart the server every time changes are made. <br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
