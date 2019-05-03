$(document).ready(function() {
    
    
  /*--------------------
      API Key + Info
  --------------------*/
  
  var apiKey = "922bd7c92bf9cbe8";
  var apiURL = "https://api.wunderground.com/api/";
  var condApiURLEnd = "/conditions/q/autoip.json";
  var forecastApiURLEnd = "/forecast/q/autoip.json";    

  /*------------------------
      API Call Functions
  ------------------------*/
  
  /*------------------------
      Current Conditions
  ------------------------*/
  
  function condApiCall (unit) {
      
      $.ajax({
        type: "GET",
        url : apiURL + apiKey + condApiURLEnd,
        dataType : "jsonp",
        success : function(json) {
            
            //look at IP, get location
            
            let location = json.current_observation.display_location.full;
            document.getElementById("location").innerHTML = location;
            
            // set the variable from the API
            
            if (unit==='c') {
                var temp = json.current_observation.temp_c;
                var feelsLike = json.current_observation.feelslike_c;
            } else {
                var temp = json.current_observation.temp_f;
                var feelsLike = json.current_observation.feelslike_f;
            }
            
            // change the elements based on unit
            
            if (unit==='c') {
                document.getElementById("cond-temp").innerHTML = temp + "<span id='unitTextHead'>°C</span>";
                document.getElementById("cond-feels-like").innerHTML = "Feels like: " + feelsLike + "<span id='unitText'>°C</span>";
            } else {
                document.getElementById("cond-temp").innerHTML = temp + "<span id='unitTextHead'>°F</span>";
                document.getElementById("cond-feels-like").innerHTML = "Feels like: " + feelsLike + "<span id='unitText'>°F</span>"; 
                
            }
      }
          
  })
};
  
  
  /*------------------------
          Forecast
  ------------------------*/
  
  function forecastApiCall (unit) {
      
  $.ajax({
      type: "GET",
      url : apiURL + apiKey + forecastApiURLEnd,
      dataType : "jsonp",
      success : function(json) {
          
          //condition and icon
            
          let weather = json.forecast.simpleforecast.forecastday[0].conditions;
          let icon = json.forecast.simpleforecast.forecastday[0].icon;
          document.getElementById("forecast-weather").innerHTML = weather;
          document.getElementById("forecast-icon").innerHTML = "<img src='https://icons.wxug.com/i/c/v2/" + icon + ".svg'>";
          
          // set the variable from the API
          
          if (unit==='c') {
              var tempHigh = json.forecast.simpleforecast.forecastday[0].high.celsius; 
              var tempLow = json.forecast.simpleforecast.forecastday[0].low.celsius;
          } else {
              var tempHigh = json.forecast.simpleforecast.forecastday[0].high.fahrenheit; 
              var tempLow = json.forecast.simpleforecast.forecastday[0].low.fahrenheit;
          };
          
          // change the elements based on unit
          
          if (unit==='c') {
              document.getElementById("temp-high").innerHTML = tempHigh + "<span id='unitText'>°C</span>";
              document.getElementById("temp-low").innerHTML = tempLow + "<span id='unitText'>°C</span>";
          } else {
              document.getElementById("temp-high").innerHTML = tempHigh + "<span id='unitText'>°F</span>";
              document.getElementById("temp-low").innerHTML = tempLow + "<span id='unitText'>°F</span>";
              }
          }
      })
  };
  
  
  /*------------------------
      Unit Toggle Button
  ------------------------*/
  
   function unitToggle () {
       
       $('#toggle').on('click', function() {
       if ($('#toggle').is(':checked')) {
          condApiCall ('f');
          forecastApiCall ('f');
       } else {
          condApiCall ('c');
          forecastApiCall ('c');
      };

  });
};
  
  unitToggle ();
  


  /*------------------------
      Current Conditions
  ------------------------*/
  
  condApiCall ('c');
  forecastApiCall ('c')
  
  

});