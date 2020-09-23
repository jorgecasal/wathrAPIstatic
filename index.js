const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
const OPEN_API_KEY = 'f54131c0ac0c2bea6b2d4583dec60d10'
let long;
let lat;
let temperatureDegree = document.querySelector('.temperature-degree')
let temperatureDescription = document.querySelector('.temperature-description')
let temperatureIcon = document.querySelector('.temperature-icon')
let temperatureOption = document.querySelector('.temperature-option')
let temperatureSpan = document.querySelector('.temperature span')
let windDegree = document.querySelector('.wind-degree')
let temperatureFeels = document.querySelector('.temperature-feels')
let locationTimezone = document.querySelector('.location-timezone')


window.addEventListener('load', () => {


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${OPEN_API_KEY}`

      fetch(api)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          locationTimezone.textContent = data.timezone.replace(/^(.*[\\\/])/,"").replace(/_/g, " ");
          temperatureDegree.textContent = Math.floor(data.current.temp - 273.15);
          temperatureFeels.textContent = `Feels like ${Math.floor(data.current.temp - 273.15)} C°`;
          temperatureDescription.textContent = `looks like ${data.current.weather[0].description}`
          temperatureIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`

          let degree = data.current.wind_deg
          windDegree.textContent = data.current.wind_deg

          
            if (degree>337.5) {windDegree.textContent = 'and the wind blows to the north';}
            else if (degree>292.5) {windDegree.textContent = 'and the wind blows to the north east';}
            else if (degree>247.5) {windDegree.textContent = 'and the wind blows to the west';}
            else if (degree>202.5) {windDegree.textContent = 'and the wind blows to the south west';}
            else if (degree>157.5) {windDegree.textContent = 'and the wind blows to the south';}
            else if (degree>122.5) {windDegree.textContent = 'and the wind blows to the south east';}
            else if (degree>67.5) {windDegree.textContent = 'and the wind blows to the east';}
            else if (degree>22.5){windDegree.textContent = 'and the wind blows to the north east';}
            else {windDegree.textContent = 'and the wind blows to the north';}
        

            temperatureOption.addEventListener('click', () => {
            if(temperatureSpan.textContent === 'C°') {
              temperatureSpan.textContent = 'F°';
              temperatureDegree.textContent = Math.floor((data.current.temp - 273.15) * (9/5)  + 32)
              temperatureFeels.textContent = `Feels like ${Math.floor((data.current.feels_like - 273.15) * (9/5)  + 32)} F°`
            } else {
              temperatureSpan.textContent = 'C°';
              temperatureDegree.textContent = Math.floor(data.current.temp - 273.15);
              temperatureFeels.textContent = `Feels like ${Math.floor(data.current.feels_like - 273.15)} C°`;
            }
          })
        })
    })
  }
})

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]
  console.log(place.address_components[0].long_name);

  if (place == null) return
   lat = place.geometry.location.lat()
   long = place.geometry.location.lng()
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${OPEN_API_KEY}`

  fetch(api)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    locationTimezone.textContent = place.address_components[0].long_name;
    temperatureDegree.textContent = Math.floor(data.current.temp - 273.15);
    temperatureFeels.textContent = `Feels like ${Math.floor(data.current.temp - 273.15)} C°`;
    temperatureDescription.textContent = `looks like ${data.current.weather[0].description}`
    temperatureIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`

    let degree = data.current.wind_deg
    windDegree.textContent = data.current.wind_deg

    
      if (degree>337.5) {windDegree.textContent = 'and the wind blows to the north';}
      else if (degree>292.5) {windDegree.textContent = 'and the wind blows to the north east';}
      else if (degree>247.5) {windDegree.textContent = 'and the wind blows to the west';}
      else if (degree>202.5) {windDegree.textContent = 'and the wind blows to the south west';}
      else if (degree>157.5) {windDegree.textContent = 'and the wind blows to the south';}
      else if (degree>122.5) {windDegree.textContent = 'and the wind blows to the south east';}
      else if (degree>67.5) {windDegree.textContent = 'and the wind blows to the east';}
      else if (degree>22.5){windDegree.textContent = 'and the wind blows to the north east';}
      else {windDegree.textContent = 'and the wind blows to the north';}
  


      temperatureOption.addEventListener('click', () => {
      if(temperatureSpan.textContent === 'C°') {
        temperatureSpan.textContent = 'F°';
        temperatureDegree.textContent = Math.floor((data.current.temp - 273.15) * (9/5)  + 32)
        temperatureFeels.textContent = `Feels like ${Math.floor((data.current.feels_like - 273.15) * (9/5)  + 32)} F°`
      } else {
        temperatureSpan.textContent = 'C°';
        temperatureDegree.textContent = Math.floor(data.current.temp - 273.15);
        temperatureFeels.textContent = `Feels like ${Math.floor(data.current.feels_like - 273.15)} C°`;
      }
    })
  })
})