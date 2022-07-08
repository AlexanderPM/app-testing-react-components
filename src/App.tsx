import React, { useEffect, useState } from 'react'
import './App.css'
import { FetchAsyncApi } from './api'

interface Res {
    Date: string
    PreviousDate: string
    PreviousURL: string
    Timestamp: string
    Valute: Record<string, any>
}

function App() {
    const initialState: JSX.Element[] = []
    const [state, setState] = useState(initialState)
    const [selectedState, setSelectedState] = useState('Доллар США')

    useEffect(() => {
        FetchAsyncApi().then((response) => {
            if (response)
                response.json().then((res: Res) => {
                    const renderArray: JSX.Element[] = Object.values(
                        res.Valute
                    ).map((element, index) => {
                        return (
                            <option value={element.Name} key={index}>
                                {element.Name}
                            </option>
                        )
                    })
                    setState(renderArray)
                })
        })
    }, [])
    console.log('render')

    function handleChange(event: { target: { value: any } }) {
        setSelectedState(event.target.value)
    }

    return (
        <div className="App">
            <h2>Тестирования JavaScript и TypeScript кода.</h2>
            <button>Кнопка</button>
            <h2>Курсы валют</h2>
            <select
                name="select"
                value={selectedState}
                onChange={handleChange}
                id="select-block"
            >
                {state}
            </select>
        </div>
    )
}

export default App
