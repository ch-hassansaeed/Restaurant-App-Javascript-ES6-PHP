export default {
      //***** Html Template :: Take restaurants Array and View all Restaurants Html Blocks */
    loadAllRestaurantsHtmlTemplate: function(restaurantsArr) {
    let htmlOutput = '';
    var fakeImgsCounter=1;
    var itemCounter=1;//it is like serial number or unique product ID 
    restaurantsArr.forEach(restaurant => {
      //first destructuring the restaurant object 
      //(instead of calling with long name like i.e restaurant.sortingValues.distance)
      const {name,status,
        sortingValues:{distance},
        sortingValues:{deliveryCosts},
        sortingValues:{minCost},
        sortingValues:{averageProductPrice},
        sortingValues:{popularity},
        sortingValues:{newest},
        sortingValues:{bestMatch},
        sortingValues:{ratingAverage},
    }=restaurant
    //after destructuring now we can easily access via i.e ${distance}

      //check is it favourite restaurant for appending Css Class 
      var isfavouriteRestCssClass='selected_off';
      var existingFavRestEntries = JSON.parse(localStorage.getItem("allFavRestaurants"));
      if(existingFavRestEntries == null) existingFavRestEntries = [];
      existingFavRestEntries.indexOf(name) === -1 ?  isfavouriteRestCssClass='selected_off':isfavouriteRestCssClass='selected_on'

      //rating review No of stars showing logic
      var ratingAverageRound=Math.floor(ratingAverage);  
      var ratingStarOutput='';
      for(var i=1;i<=ratingAverageRound;i++)
      {
        ratingStarOutput+='<i class="fa fa-star"></i>';
      }

      //as simple.json dont have image path so i am using fake random images for nice GUI
      fakeImgsCounter=this.getRandomInt(8);
      fakeImgsCounter=fakeImgsCounter==0?1:fakeImgsCounter;//replace 0 with 1 ::randam number can give 0 but our images name start form 1
      
      //make single restaurant html block and append in 'ouput' for all restaurants 
      htmlOutput += `
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
      <div class="all-meal">
      <div class="top">
      <a href="#"><div class="bg-gradient"></div></a>
      <div class="top-img">
      <img src="images/img-${fakeImgsCounter}.jpg" alt="">
      </div>
      <div class="logo-img">
      <img src="images/logo-${fakeImgsCounter}.jpg" alt="">
      </div>
      <div class="top-text">
      <div class="heading"><h4><a href="#">${name}</a></h4></div>
      <div class="sub-heading">
      <h5><span class="res-status">${status}</span></h5>
      <p><i class="fa fa-map-marker" aria-hidden="true"></i> ${distance}</p>
      </div>
      </div>
      </div>
      <div class="bottom">
      <div class="bottom-text">
      <div class="rest_extra_attributes"><i class="fa fa-shopping-cart"></i>Delivery Cost : ${deliveryCosts}</div>
      <div class="rest_extra_attributes"><i class="fas fa-euro-sign"></i>Min Costs : ${minCost}</div>
      <div class="rest_extra_attributes"><i class="far fa-money-bill-alt"></i>Average Price : ${averageProductPrice}</div>
      <div class="rest_extra_attributes"><i class="fa fa-users"></i>popularity : ${popularity}</div>
      <div class="rest_extra_attributes"><i class="fa fa-fire"></i>Newest : ${newest}</div>
      <div class="rest_extra_attributes"><i class="far fa-thumbs-up"></i>Best Match : ${bestMatch}</div>
      <div class="star">
      ${ratingStarOutput}
      <span>${ratingAverage}</span>
      <div class="bookmark"><i class="fa fa-bookmark fa-2x ${isfavouriteRestCssClass}" id="bookmark_restaurant_${itemCounter}" data-restid="${name}" aria-hidden="true"></i></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      `;
        //for register event to store favourite in local storage,  we need Css Id as bookmark_restaurant_itemCounter 
        itemCounter=itemCounter+1;//it is like serial number or unique product ID 
    
    });//for loop end
    //htmlOutput += '';
    document.getElementById('restaurants_list_results').innerHTML = htmlOutput;//now show html on frontend

    //now register event handler to store favourite in local storage
    for(var i=1;i<itemCounter;i++)
    {
        document.getElementById("bookmark_restaurant_"+i).addEventListener('click', this.addRestaurantInBookmarkStorage);
    }
    
    }
    ,getRandomInt:function (max) {
        return Math.floor(Math.random() * Math.floor(max));//Math.random() give 0 to 1 so that we we limit it form 0 to max
      }
    ,addRestaurantInBookmarkStorage:function () {
  
    var dataRestidText = this.getAttribute("data-restid");//save current Title in local storage consider it as ID
    // Parse all previously local storage favourite restaurant from JSON to object
    var existingEntries = JSON.parse(localStorage.getItem("allFavRestaurants"));
    if(existingEntries == null) existingEntries = [];

    if(existingEntries.indexOf(dataRestidText) === -1)
    {//unique //so bookmark as favourite
        existingEntries.push(dataRestidText);
        this.classList.add('selected_on');
        this.classList.remove('selected_off');
    }
    else
    { //already exist //so un-bookmark from favourite
        existingEntries = existingEntries.filter(m => {
            return m !== dataRestidText;
          });
          this.classList.add('selected_off');
          this.classList.remove('selected_on');
    }
    //now update this new appended array in local storage array
    localStorage.setItem("allFavRestaurants", JSON.stringify(existingEntries));
    }

  };//end export default {
  
 