import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feed() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/resources')
      .then(res => setResources(res.data));
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      {resources.map(r => (
        <div key={r._id}>
          <a href={r.url}>{r.title}</a> ({r.scope})
        </div>
      ))}
    </div>
  );
}
