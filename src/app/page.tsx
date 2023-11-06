/* eslint-disable @next/next/no-img-element */
"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [data, setData] = useState<any>(null);

  async function getDefaultCity() {
    const a: any = await axios.get(
      `//api.weatherapi.com/v1/current.json?key=4ab6aa15014d4c61bed234104230411&q=Belo-horizonte&aqi=no`
    );
    return a.data;
  }

  useEffect(() => {
    async function fetchData() {
      const defaultCity = await getDefaultCity();
      console.log(defaultCity);
      setData(defaultCity);
    }
    fetchData();
  }, []);
  function handleTheme() {
    setDark(!dark);
  }
  const [city, setCity] = useState("");
  async function getWeather() {
    try {
      const d: any = await axios.get(
        `//api.weatherapi.com/v1/current.json?key=4ab6aa15014d4c61bed234104230411&q=${city}&aqi=no`
      );
      setData(d.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className={`w-scree h-screen ${dark ? "dark" : " "}`}>
      <div className="w-screen h-screen flex flex-col bg-white dark:bg-gray-900 transition-all duration-100 ease-linear">
        <div className="w-screen h-[7%] bg-blue-600 flex justify-end items-center">
          <div
            className={`flex dark:justify-end justify-start items-center p-2 w-[5rem] h-[2.5rem] rounded-full bg-blue-400 mr-16 hover:cursor-pointer`}
            onClick={handleTheme}
          >
            <div className="w-[2rem] h-[2rem] rounded-full bg-white dark:bg-gray-800"></div>
          </div>
        </div>
        <div className="w-screen h-[93%] items-center py-24 flex flex-col">
          <div>
            <input
              type="text"
              onChange={(event) => setCity(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="London, UK"
              className="h-[3rem] rounded w-[25rem] bg-zinc-300 dark:text-white p-2 dark:bg-zinc-700"
            />
            <button
              onClick={getWeather}
              className="bg-blue-600 text-white h-[3rem] p-3 rounded ml-2"
            >
              Search
            </button>
          </div>
          <div className="mt-36 flex flex-row bg-zinc-200 dark:bg-gray-800 rounded-2xl p-9 h-[20rem] w-[40rem]">
            <div className="flex flex-col w-5/6 h-full">
              <div className="flex flex-row items-center h-fit">
                <img
                  src={data ? data.current.condition.icon : ""}
                  className="w-[5rem] h-[5rem]"
                  alt=""
                ></img>
                <h1 className="text-3xl font-semibold dark:text-white ">
                  {data ? data.location.name : "Loading..."}
                </h1>
              </div>
              <div>
                <p className="dark:text-white text-xl ml-[5rem] font-semibold">
                  Air humidity: {data ? data.current.humidity : "Loading..."}%
                </p>
                <p className="dark:text-white text-xl ml-[5rem] font-semibold">
                  Feels Like: {data ? data.current.humidity : "Loading..."}°C
                </p>
              </div>
            </div>
            <div className="ml-6 h-full w-1/6">
              <h1 className="text-4xl mt-5 font-semibold dark:text-white ">
                {data ? data.current.temp_c : "Loading..."}°C
              </h1>
              <h1 className="text-2xl font-semibold dark:text-white ">
                {data ? data.current.condition.text : "Loading..."}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
