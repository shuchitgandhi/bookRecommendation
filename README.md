Book Recommendation System
==========================

A book recommender system implemented in Javascript. It uses the Weighted item kNN algorithm, which can be used to train the required kNN model.

For the theoretical backgound see the following report in the above repository:

    Book Recommendation System
    Shuchit Gandhi, Ananta Soneji, Ankul Jain, Shreyansh Jain
    DA-IICT

The repository contains a basic implementation of the engine and the recommender model.

Recommender engine
--------------------

The engine implements filtering, prediction and ranking.

* [engine/bookRecoEngine.js](https://github.com/shuchitgandhi/bookRecommendation/blob/master/engine/bookRecoEngine.js)
    
It provides two methods:

1) Get a sorted list of recommendations according to the user's likes and views

    BookReco.getRecommendations(category, likes, views)

2) Get a sorted list of all items

    BookReco.getSortedList(category, likes, views)

Both of the above methods return an indexed array of book recommendations with the best recommendation being at index 0. Every element in the array is further an associative array with the following values:
    
<table> 
<tr><th>Key</th><th>Value</th></tr>
<tr><td>p</td><td>item D</td></tr>
<tr><td>t</td><td>title</td></tr>
<tr><td>g</td><td>category</td></tr>
<tr><td>x</td><td>expiry date (optional) e.g. "2012/12/27 20:55:00"</td></tr> 
</table>

Books having a past expiry date will be left out of the selection method.

The engine also has a diversification filter on the basis of category that avoids consecutive recommendations of the same category. This can be disabled by setting the categoryDiversify variable in the getRecommendations method to false.

Recommender model 
-------------------

The model file contains a kNN model. The model uses time based content-based filtering (based on item-attributes):
 
* [src/contentBasedFiltering.java](https://github.com/shuchitgandhi/bookRecommendation/blob/master/src/contentBasedFiltering.java)
    
Authorship
-------------

## Authors

See [Authors](Authors)

## Acknowledgements

This work was done as part of the course - Introduction to Artificial Intelligence, taught by Prof. Sourish Dasgupta

