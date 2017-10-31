'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// This method includes contextual this. Arrow functions do not bind a contextual this.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // This is a conditional (ternary) operator that is taking the place of an if/else statement. To the left of the question mark is the conditional, immediately to the left is what happens if the conditional is true, and to the right of the colon is what happens if the conditional is false. The statement is saying that if this.publishedOn exists, then set publishStatus to string indicating how many days ago it was published. If it doesn't exist, then set publish status to draft.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// This is a class level function; class declarations are not hoisted. We had to define loadAll() before we called it in fetchAll(). rawData represents whatever we put it as an argument, which in this case is the parsed localStorage.rawData. In previous labs, we just pushed the array of articles and didn't pass in an argument. Now we added the part where we have to load from localStorage.
Article.loadAll = rawData => {
  rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  rawData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEW: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {

    // STRETCH GOAL. We added a publishedTime property to each new article generated from those point forward.
    let currentTime = new Date().getTime();
    window.setInterval('checkUpdates()', 10000);

    // REVIEW: When rawData is already in localStorage we can load it with the .loadAll function above and then render the index page (using the proper method on the articleView object).

    //DONE: This function takes in an argument. What do we pass in to loadAll()?
    Article.loadAll(JSON.parse(localStorage.rawData));

    //DONE: What method do we call to render the index page?
    articleView.initIndexPage();
    // COMMENT: How is this different from the way we rendered the index page previously? What the benefits of calling the method here?
    // Previously, we called the initIndexPage method on our index.html page. Now, we need to call Article.fetchAll() first to check if localStorage has the raw data so that the method doesn't load an empty page. If it doesn't, we need to cache the raw data into local storage.


  } else {
    // DONE: When we don't already have the rawData:
    // - we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?)
    // - we need to cache it in localStorage so we can skip the server call next time
    // - we then need to load all the data into Article.all with the .loadAll function above
    // - then we can render the index page
    $.getJSON('../data/hackeripsum.json')
      .done(function(json) {
        localStorage.rawData = JSON.stringify(json);
        console.log('localStorage data stored' , localStorage.rawData)})
      .fail(function() { console.log('failed to load'); })

    // COMMENT: Discuss the sequence of execution in this 'else' conditional. Why are these functions executed in this order?
    // It checks if localStorage data exists first and if so, loads it. If it doesn't, it uses Ajax to get the data from the .json file. It's executed in this order for efficiency so that we don't reload existing data.
  }
}

function checkUpdates() {
  let isUpdated = false;
  $.ajax('../data/hackeripsum.json', {
    type: 'HEAD',
    success: function(response, status, xhr) {
      console.log(xhr);
      if (isUpdated === false) {
        isUpdated = true;
        return;
      }
      if (Article.all[0].publishedTime && Article.all[0].publishedTime > currentTime) {
        localStorage.clear();
      }
    }
  });
}
