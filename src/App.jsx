import { useEffect, useState } from "react";
import Display from "./Display";
import Search from "./Search";
import axios from "axios";

function App() {
 
  

  const [weather, setWeather] = useState([]);
  const [histroy, setHistroy] = useState([]);

  const [loader, setLoader] = useState(false);
  const API_KEY = `21805bff7224936fa25d6cec016a0a4b`;

  const clearAll = () => {
    setHistroy([]);
    localStorage.removeItem("histroy")
  }

  const removeHistory = (index) => {
    if (histroy.length == 1) {
      clearAll();
    } else {
      const newHistroy = histroy.filter(
        (h, i) => {
          if (i == index) return false;
          else return true
        }
      )
      setHistroy(newHistroy);
    }
  }




  const searchWeather = (city) => {
    setLoader(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    // console.log("hello",city);
    axios.get(url)
      .then(
        (success) => {  
          setWeather(success.data);
          let flag = false;

          for (var i = 0; i < histroy.length; i++) {
            if (histroy[i].city == city) {
              flag = true;
              break;

            }
          }
          if (flag == false) {
            setHistroy([
              ...histroy, {
                city,
                timestamp: new Date().getTime()
            }

            ])

          }
          // console.log(success.data.main.temp);
          // console.log(success.data.name);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      ).finally(
        () => {
          setLoader(false);
        }
      )
  }

  useEffect(
    () => {
      if (histroy.length != 0) {
        localStorage.setItem("histroy", JSON.stringify(histroy));
      }
    },
    [histroy]
  )

  useEffect(
    () => {
      const lsHistroy = localStorage.getItem("histroy");
      if (lsHistroy != undefined) {
        setHistroy(JSON.parse(lsHistroy));
      }
    },
    []
  )

  return (
    <div className=" bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      <Search searchWeather={searchWeather} />
      <Display removeHistory={removeHistory} clearAll={clearAll} loader={loader} searchWeather={searchWeather} weather={weather} histroy={histroy} />
    </div>
  );
}

export default App;
