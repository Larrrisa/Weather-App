import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import WeatherList from "./components/WeatherList";
import { FiLoader } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      id: Math.random() * 10,
      title: "Самара",
      temp: 8,
      desc: "Sunny",
      icon: "1d",
    },
  ]);

  const fetchData = async (inputValue) => {
    setIsLoading(true);
    try {
      const link = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=30f236e20b11dc2477d9b1e50ef0518d&units=metric`;
      const result = await fetch(link);
      const weatherData = await result.json();
      const temperature = Math.round(weatherData.main.temp);
      const description = weatherData.weather[0].main;
      const icon = weatherData.weather[0].icon;
      setTemperature(temperature);
      setDescription(description);
      setIcon(icon);
      setData([
        {
          id: Math.random() * 10,
          title: `${inputValue}`,
          temp: temperature,
          desc: description,
          icon: icon,
        },
        ...data,
      ]);
    } catch {
      alert("City isn't found. Try again!");
    }
    setIsLoading(false);
  };

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchData(inputValue);
    setInputValue("");
  }

  function handleClickCurrentCoords() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const link = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=30f236e20b11dc2477d9b1e50ef0518d&units=metric`;
        const result = await fetch(link);
        const weatherData = await result.json();
        const temperature = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].main;
        const icon = weatherData.weather[0].icon;

        setTemperature(temperature);
        setDescription(description);
        setIcon(icon);
        setData([
          {
            id: Math.random() * 10,
            title: `${weatherData.name}`,
            temp: temperature,
            desc: description,
            i: icon,
          },
          ...data,
        ]);
      } catch {
        alert("City isn't found. Try again!");
      }
      setIsLoading(false);
    });
  }

  return (
    <div>
      <div className="header__title">
        <Header />
      </div>
      <div>
        <div className="search ">
          <div className="search__input">
            <SearchBar
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
            />
          </div>
          <div className="search__btn">
            <Button
              handleClick={handleClickCurrentCoords}
              className=" flex align-middle"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="preloader">
            <IconContext.Provider value={{ size: "40px" }}>
              <FiLoader />
            </IconContext.Provider>
          </div>
        ) : (
          <div>
            <WeatherList
              temperature={temperature}
              description={description}
              data={data}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
