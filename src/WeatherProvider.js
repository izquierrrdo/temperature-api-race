import fillTemlate from './fillTemplate';

class WeatherProvider {
  constructor(name, mapPoint, endPointTemplate, temperaturePath) {
    this.name = name;
    this.lat = mapPoint.lat;
    this.long = mapPoint.long;
    this.endPointTemplate = endPointTemplate;
    this.endPoint = fillTemlate(this.endPointTemplate, {
      lat: this.lat,
      long: this.long,
    });
    this.temperaturePath = temperaturePath;
  }

  fetchData() {
    return fetch(this.endPoint)
      .then((result) => result.json())
      .then((data) => ({
        ...data,
        temperaturePath: this.temperaturePath,
        apiName: this.name,
      }));
  }
}

export default WeatherProvider;
