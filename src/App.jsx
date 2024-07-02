import './App.css'
import CurrencyConvertor from './components/CurrencyConvertor'

function App() {
  return (
    <>
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center rounded-lg'>
        <div className="container">
          <CurrencyConvertor />
        </div>
      </div>
    </>
  )
}

export default App
