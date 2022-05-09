import {React, useState} from '@/config/library'

const App = () => {
  const [name, setName] = useState<string>('Arindam');
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Hello {name}!</h2>
      <p>I am a pargraph</p>
      <input
        type="text"
        value={name}
        onchange={(e) => setName((e.target as HTMLInputElement).value)}
      />
      <h2> Counter value: {count}</h2>
      <button onclick={() => setCount(count + 1)}>+1</button>
      <button onclick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};


export default App