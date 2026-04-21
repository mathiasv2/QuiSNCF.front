import { Routes, Route } from 'react-router-dom'
import { GamePage } from './pages/gamePage'
import { HomePage } from './pages/homePage'


export default function App() {
  return (
    <div className="bg-[url(src/assets/identites_0.jpg.webp)] bg-no-repeat bg-cover bg-center min-h-screen">
      <h1 className='text-center text-amber-200 text-7xl py-9'>SNCFdle</h1>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/game' element={<GamePage/>}/>
      </Routes>
    </div>
  )
}