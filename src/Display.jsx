import React from 'react';
import { IoMdClose } from "react-icons/io";

const Display = ({ weather, histroy, searchWeather, loader, clearAll, removeHistory }) => {

    function timeAgo(timestamp) {
        const now = new Date().getTime();
        const seconds = Math.floor((now - timestamp) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };


        let counter;
        for (const interval in intervals) {
            counter = Math.floor(seconds / intervals[interval]);

            if (counter > 0) {
                if (counter === 1) {
                    return `${counter}  ${interval} ago`;
                } else {
                    return `${counter}  ${interval}s ago`;
                }
            }
        }
        return 'just now';
    }



    return (
        <div className='grid grid-cols-5 max-w-[1200px] mx-auto'>
            <div className=' text-gray-700'>
                <h3 className="text-4xl font-bold text-center mt-5">Histroy
                    <div className='pt-[20px]'><button onClick={clearAll} className='py-2   px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-center' >Clear All</button></div>
                </h3>
                <hr className='my-3 text-gray-700' />
                <ul className='px-[20px] my-[10px] text-2xl cursor-pointer'>
                    {
                        histroy.map(
                            (h, i) => {
                                return (
                                    <li className=' my-2  relative' key={i} onClick={() => searchWeather(h.city)} >{h.city}
                                        <span className=' block  text-sm'>{timeAgo(h.timestamp)}</span>
                                        <IoMdClose onClick={(event) => {
                                            event.stopPropagation();
                                            removeHistory(i)
                                        }} className='absolute right-0 top-[50%]' />
                                    </li>
                                )
                            }
                        )
                    }



                </ul>
            </div>
            <div className='col-span-4'>
                <div className="flex flex-col   min-h-screen text-gray-700 p-10 w-[100%] ">
                    {/* Component Start */}
                    <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
                        {
                            loader == true ?
                                <>

                                    <div role="status" class="max-w-sm animate-pulse">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                        <span class="sr-only">Loading...</span>
                                    </div>



                                </>
                                :
                                weather.length === 0
                                    ?
                                    <h1 className='text-center  '>place  enter a city </h1>
                                    :
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-6xl font-bold">{weather.main.temp}°C</span>
                                            <span className="font-semibold mt-1 text-gray-500">{weather.name}</span>
                                        </div>
                                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                                    </div>
                        }


                    </div>

                    {/* Component End  */}
                </div>
            </div>

        </div>

    );
}

export default Display;
