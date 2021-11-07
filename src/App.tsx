import React, { useEffect, useState } from 'react';
import axios from 'axios'

import { AutoComplete } from './components/AutoComplete';
import './styles.css'

const API = axios.create({
  baseURL: 'http://localhost:3333'
})

type FoodData = {
  id: number,
  name: string,
  price: string,
  category: string
}

function App() {
  const [foods, setFoods] = useState([] as FoodData[]) // Lista dos itens vindo da API //
  const [food, setFood] = useState({} as FoodData)

  useEffect(() => {
    async function getAPIAllFoods() {
      const data = await API.get('/food').then(res => res.data)
      setFoods(data)
    }

    getAPIAllFoods()
  }, [])

  return (
    <div className="App">

      <h2>Input: Auto-Complete</h2>

      <AutoComplete items={foods} onSelectedChange={setFood} />

      { // Teste //
        food.name ? (
          <section className='section'>
            <h1>ITEM SELECIONADO</h1>
            <p>{food.name}</p>
            <p>R$ {food.price}</p>
            <p>Categoria: {food.category}</p>
          </section>
        ) : (
          <h1>SEM ITEM SELECIONADO</h1>
        )
      }

    </div>
  );
}

export default App;
