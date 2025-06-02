import './App.css'
import PhaserDogGame from './components/PhaserDogGame'

function App() {
  return (
    <>
      <h1>Phaser Dog Game Demo</h1>
      <p>A simple walking dog animation using React + Phaser.js</p>

      <div style={{ marginTop: '20px' }}>
        <p>Fast dog (speed: 400):</p>
        <PhaserDogGame speed={100} />
      </div>

      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Install: <code>npm install phaser-dog-game-hyunn</code>
      </p>
    </>
  )
}

export default App
