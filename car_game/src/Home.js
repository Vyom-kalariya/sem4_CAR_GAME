import React, { useState, useEffect } from 'react';
import './App.css';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('selectedColor') || 'None');
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('selectedColor', selectedColor);
    updatePlayerCarColor(selectedColor);
  }, [selectedColor]);

  const playSound = (file) => {
    const sound = new Audio(file);
    sound.play().catch(error => console.log('Audio play failed:', error));
  };

  const selectEngine = (engine) => {
    setSelectedEngine(engine);
    playSound('prebtn.mp3');
  };

  const selectBody = (body) => {
    setSelectedBody(body);
    playSound('body_sound.wav');
  };

  const selectColor = (color) => {
    setSelectedColor(color);
    playSound('color_sound.wav');
  };

  const getCarImageSrc = () => {
    const colorMap = {
      Red: 'car_red.png',
      Blue: 'car_blue.png',
      Green: 'car_green.png',
      Yellow: 'car_yellow.png',
      Black: 'car_black.png',
      White: 'car_white.png',
      Orange: 'car_orange.png',
      Purple: 'car_purple.png'
    };
    return `cars/${colorMap[selectedColor] || 'car_base.png'}`;
  };

  const updatePlayerCarColor = (color) => {
    const playerCar = document.getElementById('player-car');
    if (playerCar) {
      playerCar.style.backgroundColor = color.toLowerCase();
    }
  };

  return (
    <div className="container text-center mt-5">
      <section id="showroom-section">
        <h1 className="mb-4"> - - - Car Showroom - - - </h1>
        <Carousel>
          <Carousel.Item>
            <video autoPlay muted className="d-block w-100" id="intro-video">
              <source src="intro_car1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
          {['red', 'blue', 'green', 'yellow', 'black', 'white', 'orange', 'purple'].map((color, index) => (
            <Carousel.Item key={index}>
              <img
                src={`cars/car_${color}.png`}
                className="d-block w-100"
                alt={`Car ${index + 2}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <section id="engine-section">
        <h1 className="mb-4">Select Engine</h1>
        <div className="row">
          {Array.from({ length: 12 }, (_, i) => `V${i + 1}`).map(engine => (
            <div className="col-6 col-md-3 mb-3" key={engine}>
              <button className={`btn engine w-100 ${selectedEngine === engine ? 'btn-success' : 'btn-primary'}`} onClick={() => selectEngine(engine)}>{engine}</button>
            </div>
          ))}
        </div>
        <h3 className="mt-4">Selected Engine: {selectedEngine || 'None'}</h3>
      </section>

      <section id="body-type">
        <h1 className="mb-4">Select Body</h1>
        <div className="row">
          {['Sporty', 'Luxury', 'Classic'].map(body => (
            <div className="col-6 col-md-3 mb-3" key={body}>
              <button className="btn body btn-primary w-100" onClick={() => selectBody(body)}>{body}</button>
            </div>
          ))}
        </div>
        <h3 className="mt-4">Selected Body: {selectedBody || 'None'}</h3>
      </section>

      <section id="body-color">
        <h1 className="mb-4">Select Body Color</h1>
        <div className="row">
          {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple'].map(color => (
            <div className="col-6 col-md-3 mb-3" key={color}>
              <button
                className="btn w-100"
                style={{ backgroundColor: color.toLowerCase(), color: color === 'Yellow' || color === 'White' ? 'black' : 'white' }}
                onClick={() => selectColor(color)}>
                {color}
              </button>
            </div>
          ))}
        </div>
        <h3 className="mt-4">Selected Color: {selectedColor}</h3>
      </section>

      <section id="car-display">
        <h1 className="mb-4">- - - - Your Car - - - -</h1>
        <img id="car-image" src={getCarImageSrc()} alt="Your Car" />
      </section>
     <button className="btn btn-warning mt-4" onClick={() => navigate('/loader')}>
  Start Racing
</button>

    </div>
  );
}

export default Home;
