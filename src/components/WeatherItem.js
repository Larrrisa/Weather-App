import iconCloud from "../images/Clouds.svg";
import iconSun from "../images/Sun.svg";
import iconNight from "../images/Clear_night.svg";
import iconRain from "../images/Rain.svg";
import iconSnow from "../images/Snow.svg";
import iconMist from "../images/Mist.svg";

function WeatherItem({ data }) {
  return (
    <div>
      {data.map((item) => {
        let url = iconSun;
        if (item.desc === "Clear" && item.icon.includes("d")) {
          url = iconSun;
          console.log(item.icon);
        } else if (item.desc === "Clear" && item.icon.includes("n")) {
          url = iconNight;
        } else if (item.desc === "Thunderstorm") {
          url = iconRain;
        } else if (item.desc === "Rain") {
          url = iconRain;
        } else if (item.desc === "Clouds") {
          url = iconCloud;
        } else if (item.desc === "Snow") {
          url = iconSnow;
        } else if (
          item.desc === "Mist" ||
          item.desc === "Smoke" ||
          item.desc === "Haze" ||
          item.desc === "Dust" ||
          item.desc === "Fog" ||
          item.desc === "Sand" ||
          item.desc === "Dust" ||
          item.desc === "Ash" ||
          item.desc === "Squall" ||
          item.desc === "Tornado"
        ) {
          url = iconMist;
        }

        return (
          <div key={item.id} className="overview-weather__body">
            <div className="overview-weather__city">{item.title}</div>
            <div className="overview-weather__temp">{item.temp}&deg;C</div>
            <div className="overview-weather__main">{item.desc}</div>
            <div className="overview-weather__icon">
              <img src={url} alt="weather icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherItem;
