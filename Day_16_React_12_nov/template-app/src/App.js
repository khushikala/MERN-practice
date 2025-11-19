// import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import { useFetch } from './components/useFetch';

function App() {
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/posts");
  if(loading){
    return <h2>loading ...</h2>
  }
  return (
    <div className="App">
    <ul>
    {data.slice(0,10).map((post)=>(
      <li ket ={post.id}>
      <strong>{post.title}</strong>
      </li>
    ))}
    </ul>
     <Counter/>
    </div>
  );
}

export default App;



