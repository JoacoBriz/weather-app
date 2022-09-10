const API_KEY = '415d5a1848b664f7afa53286a0c1e218';
const body = document.body;

// TOMA DATOS DE GEOLOCALIZACION DEL USER
const getGeolocationData = () => {
  navigator.geolocation.getCurrentPosition(weatherData);
};

// TOMA LA DATA DE LA API
const weatherData = async position => {
  try {
    const {latitude, longitude} = position.coords;

    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    
    const data = await resp.json();
    console.log(data);
    return crearCardWeather(data);

  } catch (error){
    throw error;
  };
}



//Crea la card con la data
const crearCardWeather = ({main, name, sys, weather}) => {
  
  const html = `
    <div class="container">
        <p class="city">${name} <span class="country">${sys.country}</span> </p>
        <p class="temp">${main.temp} <span class="celcius">C</span></p>
        <div class="maxymin-container">
          <p>Max: <span>${main.temp_max}</span></p>
          <p>Min: <span>${main.temp_min}</span></p>
        </div>
        <p class="humidity">Humedad: <span>${main.humidity}%</span></p>
        <img src="" alt="">
        <p class="description">${weather[0].description}</p>
    </div>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  body.append(div);
};