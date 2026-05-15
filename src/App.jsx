import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-xl font-bold"> Count: {count}</div>
      <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Increment
      </button>
    </>
  )

}