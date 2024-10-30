import './App.css';
import { MOVIES } from './mocks/movie.js';
import { useEffect, useState } from 'react';
 
function Button({ className, style, children, onMouseEnter, onMouseLeave }) {
  return (
    <button 
    className={className} 
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
} 

function App() {
  const [posters, setPosters] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setPosters(MOVIES.results);
  }, []);

  return (
    <div>
      <div 
      className="poster-container"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '0px',
        padding:'0px'
      }}
      >
        {posters.map(movie => (
          <div key={movie.id}>
            <Button
              className="poster"
              style={{
                display: 'block',
                padding: '0px',
                margin: '5px',
                width: '110px',
                height: '170px',
                filter: hovered === movie.id ? 'brightness(0.5)' : 'brightness(1)'
              }}
              onMouseEnter={() => setHovered(movie.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%', // 이미지가 버튼의 너비에 맞게
                  height: '100%', // 이미지가 버튼의 높이에 맞게
                  objectFit: 'cover', // 이미지가 버튼 크기에 맞춰 채워지도록
                  borderRadius: '8px',
                }}
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
