import React, { useEffect, useState } from 'react';
import { AiOutlineSwap } from "react-icons/ai";
import Dropdown from './Dropdown';

function CurrencyConvertor() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(20);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  // Fetching currencies
  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();
      const currencyCodes = Object.keys(data);
      setCurrencies(currencyCodes);
    } catch (error) {
      console.error('Error While Fetching ', error);
    }
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount) {
      return;
    }
    setConverting(true);
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await response.json();
      setTimeout(() => {
        setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        setConverting(false);
      }, 1500)
    } catch (error) {
      console.error('Error While Fetching ', error);
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className='max-w-xl mx-auto my-10 p-10 bg-white rounded-lg shadow-lg'>
      <h1 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Convertor</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
        <Dropdown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title='From:'
        />
        <div className='flex justify-center -mb-5 sm:mb-0'>
          <button onClick={swapCurrencies} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-indigo-300 hover:text-indigo-950'>
            <AiOutlineSwap className='text-xl' />
          </button>
        </div>
        <Dropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title='To:'
        />
      </div>
      <div className="mt-4">
        <label htmlFor="amount" className='block text-sm font-medium text-gray-500 text-left'>Amount:</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          className='w-full focus:outline-none p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        />
      </div>
      <div className='flex justify-end mt-5'>
      {converting ? (
          <button disabled type="button" className="text-white bg-indigo-100 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-3.5 text-center dark:bg-indigo-600 dark:focus:ring-indigo-800 inline-flex items-center transition duration-600 ease-in-out">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            converting...
          </button>
        ) : (
          <button onClick={convertCurrency} className="bg-indigo-300 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out text-indigo-950 px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700">
            Convert
          </button>
        )}
      </div>
      {convertedAmount && (
        <div className='w-full p-2 rounded-lg mt-5 text-lg text-green-800 bg-green-200'>
          Converted amount: {convertedAmount}
        </div>
      )}
    </div>
  )
}

export default CurrencyConvertor;
