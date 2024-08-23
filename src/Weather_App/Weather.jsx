import axios from "axios";
import React, { Component } from "react";
import clearSun from './icons/clearsun.png';
import clouds from './icons/clouds.png';
import defaultImg from './icons/default.png'; 
import misticon from './icons/mist.png';
import snowicon from './icons/snow.png';
import thunder from './icons/thunder.png';
import thunderandRain  from './icons/thunder and rain.png'
import sunandCloud from './icons/sun and cloud .png'
import moderaterainicon from './icons/moderaterain.png'
import rainicon from './icons/rain.png'
import hazeicon from './icons/haze.png'


export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.divRef = React.createRef();
    this.state = {
      city: "kolhapur",
      humidity: "",
      wind: "",
      description: "",
      temp: "",
      icon: defaultImg,  // Add state for icon
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Update background and icon only if description changes
    if (prevState.description !== this.state.description) {
      this.updateBackground();
      this.updateIcon();
    }
  }

  fetchData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=c9d417cc94f2fadd7d35b12842219f65`)
      .then((res) => {
        const data = res.data;
        this.setState({
          city: data.name,
          humidity: data.main.humidity,
          temp: Math.round(data.main.temp - 273.15),
          wind: data.wind.speed,
          description: data.weather[0].description,
        });
      }).catch((error) => {
        alert("Failed to fetch weather data: " + error.message);
      });
  };

  getRequest = () => {
    const city = this.inputRef.current.value;
    this.setState({ city }, this.fetchData);
  };

  updateIcon = () => {
    const iconMap = {
      "overcast clouds": "https://cdn-icons-png.flaticon.com/512/1146/1146856.png",
      haze: hazeicon,
      mist: misticon,
      "thunderstorm with light rain": thunderandRain,
      "moderate rain": moderaterainicon,
      "clear sky": clearSun,
      "broken clouds": clearSun,
      "partly cloudy": sunandCloud,
      "scattered clouds": clouds,
      snow: snowicon,
      rain: rainicon,
      fog: misticon,
      windy: hazeicon,
      drizzle: moderaterainicon,
      "light rain": moderaterainicon,
      thunderstorm: thunder,
      "light intensity drizzle": moderaterainicon,
      default: defaultImg,
    };

    this.setState({ icon: iconMap[this.state.description] || iconMap.default });
  };

  updateBackground = () => {
    if (this.divRef.current) {
      const { description } = this.state;

      const backgroundImageUrls = {
        "overcast clouds": "https://64.media.tumblr.com/32bd8387a7a810b07015a3f1dd412f26/tumblr_o27c7fByaO1tchrkco1_500.gif",
        haze: "https://i.pinimg.com/originals/cc/51/a3/cc51a378a4accec027b87361dab54217.gif",
        mist: "https://i.pinimg.com/originals/cc/51/a3/cc51a378a4accec027b87361dab54217.gif",
        "thunderstorm with light rain": "https://cdn.pixabay.com/animation/2023/02/15/02/20/02-20-04-915_512.gif",
        "moderate rain": "https://cdn.pixabay.com/animation/2023/02/15/02/20/02-20-04-915_512.gif",
        "clear sky": "https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif",
        "broken clouds": "https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif",
        "partly cloudy": "https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif",
        "scattered clouds": "https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif",
        snow: "https://media.giphy.com/media/l3vRk4FqcHtO4sGFm/giphy.gif",
        "light rain": "https://i.namu.wiki/i/fp43xQfZm0qnV-gneetBOIG_6CQsJdQEVdKxXciR7_TtsFmVLmsJYdtUA1yW-4n4O4bOvfouy5377balPr6QHg.gif",
        rain: "https://i.namu.wiki/i/fp43xQfZm0qnV-gneetBOIG_6CQsJdQEVdKxXciR7_TtsFmVLmsJYdtUA1yW-4n4O4bOvfouy5377balPr6QHg.gif",
        fog: "https://media.giphy.com/media/6Xl5bJ0M6SpKw/giphy.gif",
        windy: "https://media.giphy.com/media/1zG3mSfdzXMcg/giphy.gif",
        drizzle: "https://media.tenor.com/AeaXKKx8CgQAAAAM/rain-droplets.gif",
        thunderstorm :"https://i.pinimg.com/originals/42/5b/81/425b811084dd2421c1df0fbe7576d883.gif",
        "light intensity drizzle": "https://i.namu.wiki/i/fp43xQfZm0qnV-gneetBOIG_6CQsJdQEVdKxXciR7_TtsFmVLmsJYdtUA1yW-4n4O4bOvfouy5377balPr6QHg.gif",
        default: "https://cdn.dribbble.com/users/2277649/screenshots/8498294/media/1f87fae49becc4fac866d70cbb5eca37.gif",
      };

      const backgroundImage = backgroundImageUrls[description] || backgroundImageUrls.default;

      this.divRef.current.style.backgroundImage = `url(${backgroundImage})`;
      this.divRef.current.style.backgroundPosition = "center";
      this.divRef.current.style.backgroundRepeat = "no-repeat";
      this.divRef.current.style.backgroundSize = "cover";
    }
  };

  render() {
    const { city, wind, temp, humidity, description, icon } = this.state;

    return (
      <div ref={this.divRef} className="container-fluid border" style={{ height: "100vh" }}>
        <div className="container h-100 d-flex align-items-center justify-content-center flex-column">
          <h3 className="text-center mb-2 text-light text-uppercase">Weather App</h3>
          <div className="row w-100 d-flex justify-content-center">
            <div className="col-md-4 col-sm-6">
              <div className="card rounded-3" style={{ opacity: "0.9", background: "rgba(0,0,0,0.4)" }}>
                <div className="card-header border-0 d-flex justify-content-evenly align-items-center">
                  <input
                    className="p-1 rounded-2 text-warning form-control mx-2 text-center"
                    type="text"
                    ref={this.inputRef}
                    placeholder="Enter name of city"
                    list="locations"
                    style={{ opacity: "0.9", backgroundColor: "transparent" }}
                  />
                  <datalist id="locations">
                    <option value="Mumbai"></option>
                    <option value="Delhi"></option>
                    <option value="Bangalore"></option>
                    <option value="Hyderabad"></option>
                    <option value="Chennai"></option>
                    <option value="Kolkata"></option>
                    <option value="Pune"></option>
                    <option value="Ahmedabad"></option>
                    <option value="Jaipur"></option>
                    <option value="Surat"></option>
                    <option value="Kanpur"></option>
                    <option value="Lucknow"></option>
                    <option value="Nagpur"></option>
                    <option value="Indore"></option>
                    <option value="Bhopal"></option>
                    <option value="Vadodara"></option>
                    <option value="Coimbatore"></option>
                    <option value="Patna"></option>
                    <option value="Mysore"></option>
                    <option value="Bhubaneswar"></option>
                    <option value="Agra"></option>
                    <option value="Nashik"></option>
                    <option value="Jabalpur"></option>
                    <option value="Visakhapatnam"></option>
                    <option value="Aurangabad"></option>
                    <option value="Rajkot"></option>
                    <option value="Varanasi"></option>
                    <option value="Amritsar"></option>
                    <option value="Dehradun"></option>
                    <option value="Siliguri"></option>
                    <option value="Madurai"></option>
                    <option value="Thrissur"></option>
                    <option value="Trivandrum"></option>
                    <option value="Udaipur"></option>
                    <option value="Mangalore"></option>
                    <option value="Jammu"></option>
                    <option value="Srinagar"></option>
                    <option value="Faridabad"></option>
                    <option value="Ghaziabad"></option>
                    <option value="Noida"></option>
                    <option value="New York"></option>
                    <option value="London"></option>
                    <option value="Paris"></option>
                    <option value="Tokyo"></option>
                    <option value="Sydney"></option>
                    <option value="Toronto"></option>
                    <option value="Los Angeles"></option>
                    <option value="Berlin"></option>
                    <option value="Dubai"></option>
                    <option value="Singapore"></option>
                    <option value="Hong Kong"></option>
                    <option value="Rome"></option>
                    <option value="Amsterdam"></option>
                    <option value="Madrid"></option>
                    <option value="Buenos Aires"></option>
                    <option value="São Paulo"></option>
                    <option value="Cape Town"></option>
                    <option value="Istanbul"></option>
                    <option value="Moscow"></option>
                    <option value="Bangkok"></option>
                    <option value="Nairobi"></option>
                    <option value="Vancouver"></option>
                    <option value="Melbourne"></option>
                    <option value="Zurich"></option>
                    <option value="Vienna"></option>
                    <option value="Stockholm"></option>
                    <option value="Prague"></option>
                    <option value="Lisbon"></option>
                    <option value="Athens"></option>
                    <option value="Oslo"></option>
                    <option value="Copenhagen"></option>
                    <option value="Dublin"></option>
                    <option value="Budapest"></option>
                    <option value="Warsaw"></option>
                    <option value="Seoul"></option>
                    <option value="Kuala Lumpur"></option>
                    <option value="Riyadh"></option>
                    <option value="Doha"></option>
                    <option value="Abu Dhabi"></option>
                    <option value="Cairo"></option>
                    <option value="Johannesburg"></option>
                    <option value="Santiago"></option>
                    <option value="Bogota"></option>
                    <option value="Lima"></option>
                    <option value="Medellin"></option>
                    <option value="Porto"></option>
                    <option value="Dubrovnik"></option>
                    <option value="Helsinki"></option>
                    <option value="Tallinn"></option>
                    <option value="Reykjavik"></option>
                    <option value="Kolhapur"></option>
                  </datalist>
                  <button
                    onClick={this.getRequest}
                    className="rounded-circle"
                    style={{ opacity: "0.9", background: "rgba(255,255,255,0.4)" }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <div className="card-body border-0 d-flex flex-column align-items-center">
                  <img
                    className="card-img-top w-50"
                    src={icon}  // Use the state for the icon
                    alt="Weather Icon"
                  />
                  <div className="card-text text-center mt-4 mb-0">
                    <p className="text-warning text-capitalize">{description}</p>
                  </div>
                  <div className="card-title text-center text-primary fw-bold text-uppercase mb-0">
                    <h3>
                      <i className="fa fa-location text-primary"></i> {city}
                    </h3>
                  </div>
                </div>
                <div className="card-footer border-0 d-flex justify-content-evenly">
                  <div className="row w-100">
                    <div className="col border-0 d-flex justify-content-center align-items-center">
                      <i className="fas fa-thermometer-half text-danger"></i>
                      <p className="text-danger fw-bold mt-3 ms-2">{temp}°C</p>
                    </div>
                    <div className="col border-0 d-flex justify-content-center align-items-center">
                      <i className="fa fa-tint text-info"></i>
                      <p className="text-info fw-bold mt-3 mx-2">{humidity}</p>
                    </div>
                    <div className="col border-0 d-flex justify-content-center align-items-center">
                      <i className="fas fa-wind text-warning"></i>
                      <p className="text-warning fw-bold mt-3 ms-2">{wind} km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
         <a href="https://github.com/utkarsh3696"> <i class="fa-brands fa-github fs-2 m-4 text-dark"></i></a>
          <a href="https://www.linkedin.com/in/utkarshkarale"><i className="fa-brands fs-2 fa-linkedin text-primary" ></i></a>
          <p className="text-secondary"><i className="fa-solid fa-at m-2 fs-6" ></i> Utkarsh Karale </p>
          </div>
        
        </div>
       
      </div>
    );
  }
}
