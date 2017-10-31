# AJAX and JSON and WRRC

**Author**: Joy Hou and Kerry Nordstrom
**Version**: 1.0.0

## Overview
We are using AJAX to pull data (journal entries) from a .JSON file in our local directory, but simulating that it's server-based data. We are adding the data to localStorage and then we are then loading the localStorage entries onto our index.html page. In doing this, we are saving time and resources in cacheing data and not having to reload on each page refresh.

## Getting Started
1. If localStorage data exists, pass in an argument to the Article.loadAll() method.
2. If localStorage data exists, call the method that renders the index page and its functions.
3. If localStorage data doesn't exist, instantiate the data from our .json file using AJAX.
4. Call the Article.fetchAll() method in the index.html page, which does the above.

## Architecture
We are using HTML, CSS, and JavaScript, and AJAX (calling JSON). We are also using jQuery, normalize.css, Handlebars, HLJS, MarkedJS.

## Change Log
10-31-2017 9:00AM Created skeleton, Joy driving.
10-31-2017 9:40AM Completed To Dos and Comments, Joy driving.
10-31-2017 9:50AM Completed README, Joy driving.
10-31-2017 10:25AM Completed stretch goal, Joy driving.
This lab didn't take that long so we didn't switch roles but Kerry navigated.

## Credits and Collaborations
jQuery - http://jquery.com/
Normalize.css - https://necolas.github.io/normalize.css/
HandlebarsJS - http://handlebarsjs.com/
HLJS - https://highlightjs.org/
MarkedJS - https://github.com/chjj/marked
