import { Routes, Route } from 'react-router-dom'
import { GamePage } from './pages/gamePage'
import { HomePage } from './pages/homePage'
import { CookiesProvider } from 'react-cookie'


export default function App() {
  return (
    <CookiesProvider>
      <div className="bg-[url(src/assets/identites_0.jpg.webp)] bg-no-repeat bg-cover bg-center min-h-screen">
        <div className="flex justify-center">
          <img src="src/assets/dle.png" className="text-amber-200 text-7xl py-7 h-48" />
        </div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/game' element={<GamePage/>}/>
        </Routes>
      </div>
    </CookiesProvider>
  )
}         