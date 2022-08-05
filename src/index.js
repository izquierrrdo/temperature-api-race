import WeatherProvider from './WeatherProvider';
import objectLens from './objectLens';

// Moscow map point
const mapPoint = {
  lat: 55.7558,
  long: 37.6176,
};

const fetchObj1 = new WeatherProvider(
  'Weather Dbi',
  mapPoint,
  'https://weatherdbi.herokuapp.com/data/weather/${lat},${long}',
  'currentConditions.temp.c'
);

const fetchObj2 = new WeatherProvider(
  'Open Meteo',
  mapPoint,
  'https://api.open-meteo.com/v1/forecasto?latitude=${lat}&longitude=${long}&current_weather=true',
  'current_weather.temperature'
);

Promise.any([fetchObj1.fetchData(), fetchObj2.fetchData()])
  .then((data) => {
    console.log(data.apiName);
    console.log(objectLens(data, data.temperaturePath));

    document.getElementById('app').innerHTML = `
    <h2>${objectLens(data, data.temperaturePath)}&nbsp;℃</h2>
    <p>${data.apiName}</p>
    `;
  })
  .catch(() => {
    console.log('Error while fetching data...');
    document.getElementById('app').innerHTML = 'Error while fetchind data';
  })
  .finally(() => {
    const cssLoader = document.querySelector('.lds-dual-ring');
    cssLoader.parentNode.removeChild(cssLoader);
  });
