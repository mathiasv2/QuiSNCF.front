import { Routes, Route } from 'react-router-dom'
import { GamePage } from './pages/gamePage'
import { HomePage } from './pages/homePage'
import { CookiesProvider } from 'react-cookie'
import { Footer } from './components/footer'
import { LeaderboardPage } from './pages/leaderboardPage'
import { NotFound } from './pages/notFoundPage'
import { WordPage } from './pages/wordPage'
import { PlayerChartPage } from './pages/playerChartPage'


export default function App() {
  return (
   <CookiesProvider>
    <div className="min-h-dvh flex flex-col">
        <div className="flex justify-center">
          <a href='/'>
            <img src="/dle1.png" className="text-amber-200 h-36 md:h-52 py-2 md:py-6" />
          </a>
        </div>
        <div className="flex-1">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/game' element={<GamePage/>}/>
            <Route path='/leaderboard' element={<LeaderboardPage/>}/>
            <Route path="*" element={<NotFound />} />
            <Route path="/word" element={<WordPage/>}/>
            <Route path="/chart" element={<PlayerChartPage/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </CookiesProvider>
  )
}         