import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(1)
    const [time, setTime] = React.useState(0)
    var bestTimeKey = "bestTime";
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    if (!tenzies){
        setTimeout(() => setTime(time+1)
                ,1000)
    }
    else {
        var bestTime = localStorage.getItem(bestTimeKey);
        if (!bestTime){
            localStorage.setItem(bestTimeKey, time)
        }
        else{
            if (parseInt(bestTime) > time){
                localStorage.setItem(bestTimeKey, time)
            }
        }
    }
    
    

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setTime(prevTime => 0)
            
        }
        setRolls(prevRoll => prevRoll + 1)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div>
            {tenzies && <Confetti 
                          width = {window.innerWidth}
                          height = {window.innerHeight}/>}
            <main className = "main">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className = "stats">
                Rolls: {rolls}
                <br/>
                Time : {time} 
                <br/>
                Best Time: {localStorage.getItem(bestTimeKey)}
                
            </div>
            
            <div className="dice-container">
                {diceElements}
            </div>
            
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            </main>
        </div>
    )
}