import { useState } from 'react';
import { MOVIES } from '../mocks/movies.js';
import './App.css';

function App() {
  let movieList = [MOVIES];
  const [movie, setMovie] = useState([MOVIES]);
  const [filter, setFilter] = useState(false);

  // 왜 props.props로 접근해야 되는지?
  // Thumbnail로 따로 빼기 전까지는 블랙이 단체로 적용됐었는데... 어떤 차이일까
  const Thumbnail = (props) => {
    return (
      <li key={props.id} className='itemContainer'>
        <img className='poster'
          src={`https://image.tmdb.org/t/p/original/${props.props.poster_path}`} 
          title={`${props.props.original_title}`}
          onMouseEnter={(e) => e.target.className = 'filteredPoster'}
          onMouseLeave={(e) => e.target.className = 'poster'}
        >
        </img>
      </li>
    )
  };

  const list = movie.map(m => 
    <ul id='movieList'>
      {m.results.map((r) => 
        // <li key={r.id} className='itemContainer'>
        //   <img className='poster'
        //     src={`https://image.tmdb.org/t/p/original/${r.poster_path}`} 
        //     title={`${r.original_title}`}
        //     onMouseEnter={(e) => e.target.className = 'filteredPoster'}
        //     onMouseLeave={(e) => e.target.className = 'poster'}
        //   >
        //   </img>
        // </li>
        <Thumbnail props={r}/>
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

function applyFilter() {
  setfilter(true);
}

export default App
