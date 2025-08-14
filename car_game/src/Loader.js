import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sound = new Audio('sound_at_intro.mp3');

    sound.oncanplaythrough = () => {
      sound.play().catch(err => console.log('Audio failed:', err));
    };

    sound.onended = () => {
      navigate('/racing'); // Navigate to Racing page
    };

    // Fallback click if autoplay fails
    document.body.addEventListener('click', () => {
      if (sound.paused) sound.play();
    });

    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, [navigate]);

  return (
    <video autoPlay muted loop id="intro-video" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      zIndex: -1
    }}>
      <source src="mids_car.mp4" type="video/mp4" />
    </video>
  );
};

export default Loader;
