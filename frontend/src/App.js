import { useEffect, useState } from 'react';
import Calendar from './calendar';

function App() {
  const [data,setData] = useState(null);
   useEffect(() => {
    fetch('http://localhost:9000/')
    .then(res => res.json())
    .then(data => setData(data.message))
    .catch(err => console.log(err))
  })

  return (
    <div className="App">
      <p>{data}</p>
      <Calendar />
    </div>
  );
}

export default App;
