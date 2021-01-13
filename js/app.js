import restaurantsApi from './restaurantsapi';
import restaurantViewTemplate from './SingleRestaurantTemplate';

//for searching restaurants
const searchForm = document.getElementById('search-form');
const showFavouriteBtn = document.getElementById('show-favourite-btn');
const searchInput = document.getElementById('search-input');
//for sorting and other global operations on restaurants
var restaurantsList;//for sorting global restaurants instead of each time load json from server api
const restaurantSortingBy = document.getElementById('restaurant_sorting_by');
var restaurantSortingByVale=restaurantSortingBy.value;//sorted by combobox/select value

//************************* Event Handlers **********************************/
//page load/startup
window.addEventListener('load', function(){
  //on startup or load page:: sort restaurants by best match and grouping
  restaurantsApi.getRestaurants(restaurantSortingBy).then(restaurants => {
    restaurantsList=restaurants;
    var finalRestaurantsGroupedSortedList=restaurantsGroupingAndSorting(restaurantsList,restaurantSortingByVale);
    restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsGroupedSortedList);
  });//restaurantsApi.getRestaurants.....End
});//window.addEventListener('load' ...End

//for sorting restaurants using restaurantSortingBy combobox/select
restaurantSortingBy.addEventListener('change', e => {
  restaurantSortingByVale=restaurantSortingBy.value;
  var finalRestaurantsGroupedSortedList=restaurantsGroupingAndSorting(restaurantsList,restaurantSortingByVale);
  restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsGroupedSortedList);
});//addEventListener('onchange'

//for input field search restaurant on each key press
var searchTermOldValue;
searchInput.addEventListener('keyup', e => {
  const searchTerm = searchInput.value;
  if(searchTerm===searchTermOldValue)//after blank input field if user press backspace then return
  return;
  if (searchTerm != '') {    
  // Search restaurants
  var finalRestaurantsSearchList=restaurantSearch(restaurantsList,searchTerm);
  restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsSearchList);
  }
  else
  {//if no or blank keyword then show all restaurant as grouped and sorting view
    var finalRestaurantsGroupedSortedList=restaurantsGroupingAndSorting(restaurantsList,restaurantSortingByVale);
    restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsGroupedSortedList);
  }
  searchTermOldValue=searchTerm;
  e.preventDefault();
});

//to show all favourite restaurant :: on "Show Favourite Restaurant" button click
showFavouriteBtn.addEventListener('click', e => {
  showFavouriteBtn.classList.toggle('favourite-list-show-on');
  if (showFavouriteBtn.classList.contains('favourite-list-show-on')) {    
    // show all favourite restaurants
    var finalRestaurantsSearchList=showFavouriteRestaurants(restaurantsList);
    restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsSearchList);
    }
    else
    {//toggle button:show normal all restaurants list
      var finalRestaurantsGroupedSortedList=restaurantsGroupingAndSorting(restaurantsList,restaurantSortingByVale);
      restaurantViewTemplate.loadAllRestaurantsHtmlTemplate(finalRestaurantsGroupedSortedList);
    }
});

//************************* Custom Functions ***********************************/

function restaurantsGroupingAndSorting(restaurants,restaurantSortingByVal) {
  var finalRestaurantsGroupedSortedList=[];
  //**make group of restaurants into 4 arrays fav,open,orderahead and closed array(then sort them and concate) **/
  //filter fav restaurants::::array1
  var allFavRestaurantsList=[];
  var existingFavRestEntries = JSON.parse(localStorage.getItem("allFavRestaurants"));
  if(existingFavRestEntries == null) existingFavRestEntries = [];
  existingFavRestEntries.forEach(function(existingFavRestEntry) { 
  for (var i = 0; i < restaurants.length; i++)
  {
    if (restaurants[i].name === existingFavRestEntry)
    {
      allFavRestaurantsList.push(restaurants[i]);
    }
  }//forloop inner::restaurants
  });//foreach outer::existingFavRestEntries
  //now sort and append in final array::finalRestaurantsGroupedSortedList
  arraySortingCompare(allFavRestaurantsList,restaurantSortingByVale);
  finalRestaurantsGroupedSortedList=finalRestaurantsGroupedSortedList.concat(allFavRestaurantsList);

  //filter open restaurants::::array2
  var allOpenRestaurantsList=[];        
  var filter_key = "status";
  var filter_val_keyword = "open";
  allOpenRestaurantsList = restaurants.filter(function(obj) {
    return obj[filter_key] === filter_val_keyword;
  });
  //now sort and append in final array::finalRestaurantsGroupedSortedList
  arraySortingCompare(allOpenRestaurantsList,restaurantSortingByVale);
  finalRestaurantsGroupedSortedList=finalRestaurantsGroupedSortedList.concat(allOpenRestaurantsList);

  //filter orderAhead restaurants::::array3
  var allOrderAheadRestaurantsList=[];        
  var filter_key = "status";
  var filter_val_keyword = "order ahead";
  allOrderAheadRestaurantsList = restaurants.filter(function(obj) {
    return obj[filter_key] === filter_val_keyword;
  });
  //now sort and append in final array::finalRestaurantsGroupedSortedList
  arraySortingCompare(allOrderAheadRestaurantsList,restaurantSortingByVale);
  finalRestaurantsGroupedSortedList=finalRestaurantsGroupedSortedList.concat(allOrderAheadRestaurantsList);
  
  //filter closed restaurants::::array4
  var allClosedRestaurantsList=[];        
  var filter_key = "status";
  var filter_val_keyword = "closed";
  allClosedRestaurantsList = restaurants.filter(function(obj) {
    return obj[filter_key] === filter_val_keyword;
  });
  //now sort and append in final array::finalRestaurantsGroupedSortedList
  arraySortingCompare(allClosedRestaurantsList,restaurantSortingByVale);
  finalRestaurantsGroupedSortedList=finalRestaurantsGroupedSortedList.concat(allClosedRestaurantsList);

  //all 4 array concated now we need to check and remove duplication
  //remove duplicate and fav items who is also part of open,orderahead and close array
  finalRestaurantsGroupedSortedList=finalRestaurantsGroupedSortedList.filter((item, index) => finalRestaurantsGroupedSortedList.indexOf(item) === index);
return finalRestaurantsGroupedSortedList;

}

function arraySortingCompare(restaurants,restaurantSortingByVal) {
  restaurants.sort(function(a, b){
    var orderType='asc';//by default sorting order is asc for all filters
    switch (restaurantSortingByVal) {
      case 'ratingAverage'://for rating we use desc because costumers want to see high rating on top 
        orderType='desc';
        break;
      case 'popularity'://for popularity we use desc because costumers  want to see high popularity on top  
        orderType='desc';
        break;
      case 'distance'://for distance we use asc order because costumers  want to see less distance on top 
        orderType='asc';  
        break;    
    }
    //now preform sorting base on sort order and input filter(restaurantSortingByVal) like popularity,distance etc
    var x = a.sortingValues[restaurantSortingByVal];
    var y = b.sortingValues[restaurantSortingByVal];
    if(orderType=='asc')
    {
      if (x < y) {return -1;}
      if (x > y) {return 1;}
    }
    else if(orderType=='desc')
    {
      if (x > y) {return -1;}
      if (x < y) {return 1;}
    }
      return 0;  
    }); //end restaurants.sort(function(a, b){
}

function restaurantSearch(restaurants,searchTerm) {
  var finalRestaurantsSearchList=[];
    //filter or search restaurants by keyword term   
    var filter_key = "name";
    var filter_val_keyword = searchTerm;
    finalRestaurantsSearchList = restaurants.filter(function(obj) {
      return obj[filter_key].toLowerCase().includes(filter_val_keyword.toLowerCase());
    });
    return finalRestaurantsSearchList; 
}

function showFavouriteRestaurants(restaurants) {
  //filter fav restaurants
  var allFavRestaurantsList=[];
  var existingFavRestEntries = JSON.parse(localStorage.getItem("allFavRestaurants"));
  existingFavRestEntries.forEach(function(existingFavRestEntry) { 
  for (var i = 0; i < restaurants.length; i++)
  {
    if (restaurants[i].name === existingFavRestEntry)
    {
      allFavRestaurantsList.push(restaurants[i]);
    }
  }//forloop inner::restaurants
  });//foreach outer::existingFavRestEntries
  return allFavRestaurantsList;

}


// use to Show Message flash alert message bar on top of page
function showMessage(message, className) {
  // Create div
  const div = document.createElement('dmeiv');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('main-container');
  // Get form
  const search = document.getElementById('search');

  // Insert alert
  searchContainer.insertBefore(div, search);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}



