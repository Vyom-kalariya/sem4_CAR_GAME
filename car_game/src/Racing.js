import React, { useEffect, useState } from 'react';
import './Racing.css';

const Racing = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setUser({
      username: formData.username,
      email: formData.email
    });
    setShowSignup(false);
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  useEffect(() => {
    if (!gameStarted) return;

    class EnemyCar {
      constructor(initialTop, speed) {
        this.element = document.createElement('div');
        this.element.classList.add('enemy-car');
        this.element.style.top = -80 - initialTop + 'px';
        this.element.style.left = Math.random() * 80 + 10 + '%';
        document.querySelector('.game-container').appendChild(this.element);
        this.speed = speed;
      }

      update(gameContainerHeight) {
        let currentTop = parseInt(window.getComputedStyle(this.element).top || '0');
        this.element.style.top = currentTop + this.speed + 'px';

        if (currentTop >= gameContainerHeight) {
          currentTop = -80;
          this.element.style.top = currentTop + 'px';
          this.element.style.left = Math.random() * 80 + 10 + '%';
          return true;
        }
        return false;
      }

      getBoundingClientRect() {
        return this.element.getBoundingClientRect();
      }

      remove() {
        this.element.remove();
      }
    }

    let playerCar = document.getElementById('player-car');
    let enemyCars = [];
    let message = document.getElementById('message');
    let gameContainer = document.querySelector('.game-container');

    let playerSpeed = 5;
    let playerPosition = 50;
    let enemySpeed = 3;

    const numEnemyCars = 3;
    const enemyCarSpacing = 150;

    const backgroundMusic = new Audio('game_bgsound.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch((error) => {
      console.error('Autoplay prevented:', error);
    });

    const gameOverSound = new Audio('loss_the_game.mp3');
    const endingSound = new Audio('win_the_game.mp3');

    const endGame = () => {
      setGameOver(true);
      backgroundMusic.pause();
      gameOverSound.play();
      message.classList.remove('hidden');
      message.innerHTML = `
        GAME OVER!<br>
        Score: ${score}<br>
        ${user ? `Player: ${user.username}` : ''}<br>
        <button class="restart-btn">RESTART</button>
        ${!user ? `<button class="signup-btn">SIGN UP</button>` : ''}
      `;

      document.querySelector('.restart-btn')?.addEventListener('click', restartGame);
      document.querySelector('.signup-btn')?.addEventListener('click', () => {
        setShowSignup(true);
        setGameOver(false);
      });
    };

    const restartGame = () => {
      enemyCars.forEach(car => car.remove());
      enemyCars = [];

      setGameOver(false);
      message.classList.add('hidden');
      playerPosition = 50;
      playerCar.style.left = playerPosition + '%';

      setScore(0);
      startGame();
    };

    const startGame = () => {
      for (let i = 0; i < numEnemyCars; i++) {
        enemyCars.push(new EnemyCar(i * enemyCarSpacing, enemySpeed));
      }
      document.addEventListener('keydown', movePlayerCar);
    };

    const movePlayerCar = (event) => {
      if (gameOver) return;

      if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
      } else if (event.key === 'ArrowRight' && playerPosition < 90) {
        playerPosition += playerSpeed;
      }

      playerCar.style.left = playerPosition + '%';
    };

    const checkCollision = () => {
      const playerRect = playerCar.getBoundingClientRect();

      for (const enemyCar of enemyCars) {
        const enemyRect = enemyCar.getBoundingClientRect();

        if (
          playerRect.left < enemyRect.right &&
          playerRect.right > enemyRect.left &&
          playerRect.top < enemyRect.bottom &&
          playerRect.bottom > enemyRect.top
        ) {
          endGame();
          return;
        }
      }
    };

    const updateEnemyCars = () => {
      if (gameOver) return;

      for (const enemyCar of enemyCars) {
        if (enemyCar.update(gameContainer.offsetHeight)) {
          setScore(prevScore => {
            const newScore = prevScore + 1;
            if (newScore > 5) enemySpeed = 4;
            if (newScore > 10) enemySpeed = 5;
            if (newScore > 15) enemySpeed = 6;
            return newScore;
          });
        }
      }

      checkCollision();
    };

    startGame();
    const interval = setInterval(updateEnemyCars, 30);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', movePlayerCar);
      backgroundMusic.pause();
    };
  }, [gameStarted, gameOver, score, user]);

  if (showSignup) {
    return (
      <div className="signup-screen">
        <div className="signup-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="signup-submit-btn">SIGN UP</button>
          </form>
          <button
            className="back-to-game-btn"
            onClick={() => {
              setShowSignup(false);
              setGameStarted(false);
            }}
          >
            BACK TO GAME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="racing-screen">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>CAR RACING GAME</h1>
          <p>Use LEFT and RIGHT arrow keys to move</p>
          <button className="start-button" onClick={() => setGameStarted(true)}>
            START RACE
          </button>
          <br />
          {!user && (
            <button
              className="start-button"
              onClick={() => setShowSignup(true)}
            >
              SIGN UP
            </button>
          )}
          {user && (
            <div className="user-info">
              Playing as: <strong>{user.username}</strong>
            </div>
          )}
        </div>
      ) : (
        <div className="game-container">
          <div id="road">
            <div id="player-car"></div>
          </div>
          <div id="score">SCORE: {score}</div>
          <div id="message" className="hidden"></div>
        </div>
      )}
    </div>
  );
};

export default Racing;
