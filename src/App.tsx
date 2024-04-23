import { useState, FormEvent } from 'react'
import logo from "./assets/adac-fuel.gif"

interface CombustivelProps {
  title: string
  valorAlcool: number | string;
  valorGasolina: number | string;
}

import './App.css'

function App() {

  const [alcool, setAlcool] = useState(0)
  const [gasolina, setGasolina] = useState(0)
  const [Combustivel, setCombustivel] = useState<CombustivelProps>()


  function calcular(event: FormEvent) {
    event.preventDefault();

    let calculo = (alcool) / (gasolina);
    console.log(calculo);


    if (calculo <= 0.7) {
      setCombustivel({
        title: "Compensa usar Álcool",
        valorAlcool: formatarMoeda(alcool),
        valorGasolina: formatarMoeda(gasolina),
      })
    } else {
      setCombustivel({
        title: "Compensa usar Gasolina",
        valorGasolina: gasolina,
        valorAlcool: alcool
      })
    }

    function formatarMoeda(valor: number) {
      let valorFormato = valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      })
      return valorFormato;
    }

  }

  return (

    <div>
      <main className='container'>
        <img src={logo}
          alt="Logo de calculadora de combustível"
        />
        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular} >
          <label >Álcool (preço por litro)</label>
          <input type="number"
            className='input'
            placeholder='4,90'
            min="1"
            step="0.01"
            required
            value={alcool}
            onChange={(e) => setAlcool(Number(e.target.value))}
          />


          <label >Gasolina (preço por litro)</label>
          <input type="number"
            className='input'
            placeholder='4,90'
            min="1"
            step="0.01"
            required
            value={gasolina}
            onChange={(e) => setGasolina(Number(e.target.value))}
          />

          <input className='button' type="submit" value="calcular" />
        </form>
        {Combustivel && Object.keys(Combustivel).length > 0 && (
          <section className='result'>
            <h2 className='result-tiltle'>{Combustivel.title}</h2>

            <span>{`Álcool:${Combustivel.valorAlcool}`}</span>
            <span>{`Gasolina:${Combustivel.valorGasolina}`}</span>

          </section>
        )}
      </main>
    </div>


  )
}

export default App
