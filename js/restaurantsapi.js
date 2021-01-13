export default {
  //***** Get Server Api End point Json Data */
  getRestaurants: function(searchTerm) {
    const api_json_url='sample.json';
    return fetch(
      api_json_url
    )
      .then(res => res.json())
      .then(data => {
        return data.restaurants;
      })
      .catch(err => console.log('Error:'+err));
  }

};//end export default {
