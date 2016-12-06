function BookReco() {
  var method = "KNN_weighted";
}

BookReco.prototype.getRecommendations = function(category, likes, views) {
  
  if(!likes) likes = [];
  if(!views) views = [];
  if(!category) category = "all";
  
  // Filter books and predict ratings
  var date = new Date();
  var ratings = new Array();
  for(i in BookReco.books) {
    var item = BookReco.books[i];
    var pid = item['p'];
    
    // Leave out null valued books in likes and views
    if(likes.indexOf(pid) !== -1 || views.indexOf(pid) !== -1) continue;
      
    // Leave out expired books
    var expires = item['x'];
    if(expires != null) {
      var expiryDate = new Date(expires);
      if(expiryDate < date) continue;
    }
    
    // Filter by category
    if(category == "all" || category == item['g']) {
        var rating = this.predict(i, likes, views);
        ratings.push({n:i, w:rating});
    }
  }
  
  // Rank books
  var categoryDiversify = true;
  ratings.sort(this.inverseSortWeight);
  
  var results = new Array();
  
  if(category != "all" || diversify == false) {
    for(var i=0; i < ratings.length; i++) 
      results.push(BookReco.books[ratings[i]['n']]);
  } else {
    // Diversify category
    var category1 = "-";
    var category2 = "-";
    
    for(var i = 0; i < ratings.length; i++) {
      var index = 0;
      
      while(index < ratings.length) {
        var item = BookReco.books[ratings[index]['n']];
        var itemCategory = item['g'];
        
        if(itemCategory != category1 && itemCategory != category2) {
          results.push(item);
          ratings.splice(index, 1);
          category2 = category1;
          category1 = itemCategory;
          break;
        }
        index++;
      }
    }
  }
  return results;
};

BookReco.prototype.predict = function(itemId, likes, views) {
  var ratings = BookReco.ratings[itemId];
  var neighbors = BookReco.nearestNeighbors[itemId];
  var rating = 0.0;
  for(var i in neighbors) {
    var pid = BookReco.books[neighbors[i]]['p'];
    if(views.indexOf(pid) !== -1) rating -= ratings[i];
    if(likes.indexOf(pid) !== -1) rating += ratings[i];
  }
  return rating;
};

BookReco.prototype.getSortedList = function(category, likes, views) {
  
  if(!likes) likes = [];
  if(!views) views = [];
  if(!category) category = "all";

  // Filter available books 
  var date = new Date();
  var selection = new Array();

  for(var i in BookReco.books) {
    var item = BookReco.books[i];

    // Leave out expired books
    var expires = item['x'];
    if(expires != null) {
      var expiryDate = new Date(expires);
      if(expiryDate < date) continue;
    }
    
    if(category == "all" || category == item['g']) {
        var pid = item['p'];
        if(likes.indexOf(pid) == -1 && views.indexOf(pid) == -1) selection.push(item);
    }
  }
  return selection;
};

BookReco.prototype.inverseSortWeight = function(a, b) {
  var diff = b['w'] - a['w'];
  if(diff == 0) diff = a['n'] - b['n'];
  return diff;
};