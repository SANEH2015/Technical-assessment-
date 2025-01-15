import React, { useState } from 'react';
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import WaterVideo from '../Assets/WaterVideo.mp4';
import axios from 'axios';
import Footer from './Footer';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const API_KEY = 'd73a93f2c3f3e72b707b768c888ea99f'; // Updated API key

  const handleSearch = async () => {
    const trimmedDestination = destination.trim();

    if (!trimmedDestination) {
      setError('Please enter a valid destination.');
      return;
    }

    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    setError('');
    setWeather(null);
    setLoading(true);

    try {
      // Get current weather and coordinates
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedDestination}&appid=${API_KEY}&units=metric`
      );

      const { name, weather, main, wind } = response.data; // Destructure the necessary data
      setWeather({ name, weather, main, wind });

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Unable to fetch weather data. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to suggest activities based on weather conditions
  const getSuggestedActivities = (weatherCondition) => {
    if (!weatherCondition) return [];

    const condition = weatherCondition.toLowerCase();

    if (condition.includes('clear') || condition.includes('sunny')) {
      return [
        { name: 'Go to the beach', img: 'https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?cs=srgb&dl=beach-blue-sky-boat-88212.jpg&fm=jpg', description: 'Relax on the beach under the sun.' },
        { name: 'Hiking', img: 'https://th.bing.com/th/id/OIP.6AnBWiCfKD-HueplmBxHcgHaE8?rs=1&pid=ImgDetMain', description: 'Explore the great outdoors and hike up mountains.' },
        { name: 'Sightseeing', img: 'https://images.unsplash.com/photo-1574158622683-74d7c8b5a3a1', description: 'Discover historical landmarks and attractions.' },
        { name: 'Swimming', img: 'https://images.unsplash.com/photo-1594237164244-512f544a5f7a', description: 'Cool off in the water with a swim.' }
      ];
    } else if (condition.includes('rain') || condition.includes('cloud')) {
      return [
        { name: 'Visit museums', img: 'https://th.bing.com/th/id/R.a18701be3b2112eaada6d92fec4e05ed?rik=6rRJIkGcidemvA&riu=http%3a%2f%2fngsmonthly.ngsgenealogy.org%2fwp-content%2fuploads%2f2015%2f12%2fNARA.jpg&ehk=e9k8QimaUWpZXZYcsOw%2bmo8AlN2Wm9j2loFc1BF7KfQ%3d&risl=1&pid=ImgRaw&r=0', description: 'Explore local culture and history indoors.' },
        { name: 'Go shopping', img: 'https://www.myweeklypreview.com.au/wp-content/uploads/2017/10/shutterstock_641814016.jpg', description: 'Shop at local malls or markets.' },
        { name: 'Watch a movie', img: 'https://cdn9.dissolve.com/p/D25_64_633/D25_64_633_1200.jpg', description: 'Relax and enjoy a movie at the cinema.' },
        { name: 'Indoor games', img: 'https://www.the-pool.com/wp-content/uploads/2020/03/indoor-scaled.jpeg', description: 'Enjoy some indoor activities like board games.' }
      ];
    } else if (condition.includes('snow') || condition.includes('cold')) {
      return [
        { name: 'Skiing', img: 'https://images.unsplash.com/photo-1519675206775-74fbe8f2d4b4', description: 'Hit the slopes and enjoy skiing.' },
        { name: 'Snowboarding', img: 'https://images.unsplash.com/photo-1586486990550-2f5f52e5fdbf', description: 'Experience the thrill of snowboarding.' },
        { name: 'Visit a spa', img: 'https://images.unsplash.com/photo-1516796177151-22e2c9b5004d', description: 'Relax and unwind at a local spa.' },
        { name: 'Enjoy hot drinks', img: 'https://images.unsplash.com/photo-1601220500367-2ccf1e7f75d1', description: 'Warm up with a cup of hot chocolate or tea.' }
      ];
    } else {
      return [
        { name: 'Explore local restaurants', img: 'https://images.unsplash.com/photo-1574158622683-74d7c8b5a3a1', description: 'Try some local cuisine and enjoy a meal.' },
        { name: 'Attend a local event', img: 'https://images.unsplash.com/photo-1519675206775-74fbe8f2d4b4', description: 'Check out local events or festivals happening nearby.' },
        { name: 'Relax indoors', img: 'https://images.unsplash.com/photo-1601220500367-2ccf1e7f75d1', description: 'Take a break and relax inside.' }
      ];
    }
  };

  const suggestedActivities = weather ? getSuggestedActivities(weather.weather[0].description) : [];

  return (
    <>
      <section className='home'>
        <div className='overlay'></div>
        <video src={WaterVideo} muted autoPlay loop type="video/mp4"></video>
        <h3 className='name'>TOURLY</h3>
        <h1 className='tagline'>JOURNEY TO EXPLORE WORLD</h1>
        <p className='quote'>Travel far enough, you meet yourself.....</p>
      </section>
      <div className='sec-div' style={{ background: 'none' }}>
        <div className='homediv'>
          <div className='homecontent container' style={{ background: 'none' }}>
            <div className='textdiv'>
              <span className='smalltext' style={{ color: "black" }}>Weather Forecast & Activities : </span>
              <h1 className='hometitle'>Search Your Destination...</h1>
            </div>
            <div className="cardDiv grid w-50" style={{ backgroundColor: '#d2ffff' }}>
              <div className="destinationInput">
                <label htmlFor='destination'>Search your destination:</label>
                <div className="input flex">
                  <input
                    id='destination'
                    type='text'
                    placeholder='Enter destination here...'
                    style={{ marginTop: "6px" }}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <GrLocation className='icon' />
                </div>
              </div>
              <div className="dateInput">
                <label htmlFor='date' style={{ marginRight: "10px" }}>Select your date:</label>
                <div className="input flex">
                  <input
                    id='date'
                    type='date'
                    style={{ marginTop: "6px", marginLeft: "20px" }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="searchoptions flex"
                onClick={handleSearch}
                style={{ cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', padding: '10px', borderRadius: '5px' }}
              >
                <HiFilter className='icon' style={{ fontSize: '24px', marginRight: '5px' }} />
                Search
              </button>
            </div>
            {loading && <p style={{ color: 'blue', marginTop: '10px' }}>Fetching weather data...</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {weather && (
              <div className='weatherInfo' style={{ marginTop: '20px', color: 'black' }}>
                <h2>Weather in {weather.name}</h2>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Condition: {weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            )}
            {suggestedActivities.length > 0 && (
              <div className='activities' style={{ marginTop: '20px', color: 'black' }}>
                <h2>Suggested Activities</h2>
                <div className="activities-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {suggestedActivities.map((activity, index) => (
                    <div key={index} className='activity-card' style={{ width: '250px', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
                      <img src={activity.img} alt={activity.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                      <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{activity.name}</h3>
                      <p style={{ textAlign: 'center' }}>{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
