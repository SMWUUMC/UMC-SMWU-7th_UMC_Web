import { useState } from 'react';
import { MOVIES } from '../mocks/movies.js';
import './App.css';

function App() {
  let movieList = [MOVIES];

  const Thumbnail = (props) => {
    return (
      <li key={props.result.id} className='itemContainer'>
        <img className='poster'
          src={`https://image.tmdb.org/t/p/original/${props.result.poster_path}`} 
          title={`${props.result.original_title}`}
          onMouseEnter={(e) => e.target.className = 'filteredPoster'}
          onMouseLeave={(e) => e.target.className = 'poster'}
        >
        </img>
      </li>
    )
  };

  const list = movieList.map(m => 
    <ul id='movieList'>
      {m.results.map((r) => 
        <Thumbnail result={r}/>
      )}
    </ul>
    )
  ;

  return (
    <article>
      {list}
    </article>
  )
}

export default App
