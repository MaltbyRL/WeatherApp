"use strict";

var $weatherForecastArray;
$(document).ready(init);

function init(){
  zipCodeRetrieval();

}

///////////////////////////////
/////Load zip-code into getWeather function.
///////////////////////////////
$('button').on("click",function(){
 var zipCode = $("#zipCodeInput").val()
  getWeather(zipCode);
})



///////////////////////////////
/////AJAX auto fill zip-code.
///////////////////////////////
  var postal;
  function zipCodeRetrieval(){
    $.get("http://ipinfo.io", function(data) {
      console.log("Postal:", data);
      postal = data.postal;
      $('#zipCodeInput').attr("placeholder", postal)
      getWeather(postal);
    }, "jsonp");
  }
  

///////////////////////////////
/////AJAX pull from API
///////////////////////////////



  function getWeather(postal){
    $.ajax({
      url: 'http://api.wunderground.com/api/650ee21210a243c3/forecast/q/' + postal + ".json",
      method: 'GET',
      success: function(data){

        "Data:"
        // console.log("Data:", data.forcast)
        // console.log("Data:", data.forcast.txt_)
        $weatherForecastArray = data.forecast.txt_forecast.forecastday
        console.log("weather:", $weatherForecastArray);
        $('.currentConditions').append($weatherForecastArray);
        console.log('inside the sucesss', $weatherForecastArray);
        populate($weatherForecastArray)
      },
      error: function(err){
        console.log('error:', err);
      }
    });
    // console.log('test');
    // console.log("postal:", postal)
    console.log('outside the sucesss', $weatherForecastArray);
  }


///////////////////////////////
/////Insert AJAX pull into HTML
///////////////////////////////

function populate($weatherForecastArray){
  console.log($weatherForecastArray);
  $(".forecastDay").text($weatherForecastArray[0].title);
  $(".currentForecast").text($weatherForecastArray[0].fcttext);

  $(".forecastImageIcon").attr({
    src:$weatherForecastArray[0].icon_url,
    title: "image",
    alt: "forecastImageIcon"
  })


  $(".forecastDayTwo").text($weatherForecastArray[2].title);
  $(".currentForecastTwo").text($weatherForecastArray[2].fcttext);

  // $(".forecastImageIcon").attr({
  //   src:$weatherForecastArray[2].icon_url,
  //   title: "image",
  //   alt: "forecastImageIcon"
  // })


  $(".forecastDayThree").text($weatherForecastArray[4].title);
  $(".currentForecastThree").text($weatherForecastArray[4].fcttext);

  // $(".forecastImageIcon").attr({
  //   src:$weatherForecastArray[4].icon_url,
  //   title: "image",
  //   alt: "forecastImageIcon"
  // })

  $(".forecastDayFour").text($weatherForecastArray[6].title);
  $(".currentForecastFour").text($weatherForecastArray[6].fcttext);

  // $(".forecastImageIcon").attr({
  //   src:$weatherForecastArray[6].icon_url,
  //   title: "image",
  //   alt: "forecastImageIcon"
  // })
}
