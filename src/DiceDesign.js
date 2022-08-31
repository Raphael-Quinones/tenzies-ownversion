import React from "react"
import "./style.css"

export default function DiceDesign(props){
    function whichDie(value){
        switch(value){
            case 1:
                return (
                    <>
                    <div className="dot middle center"></div>
                    </>
                    );
                break;
            case 2:
                return (
                    <>
                    <div className="dot middle left" />
                    <div className="dot middle right" />
                    </>
                    );
                break;
            case 3:
                return (
                    <>
                    <div className="dot middle left" />
                    <div className="dot middle right" />
                    <div className="dot center middle" />
                    </>
                    );
                break;
            case 4:
                return (
                    <>
                    <div className="dot top left" />
                    <div className="dot top right" />
                    <div className="dot bottom left" />
                    <div className="dot bottom right" />
                    </>
                    );
                break;
            case 5:
                return (
                    <>
                    <div className="dot bottom left" />
                    <div className="dot bottom right" />
                    <div className="dot top left" />
                    <div className="dot top right" />
                    <div className="dot middle center" />
                    </>
                    );
                break;
            case 6:
                return (
                    <>
                    <div className="dot top left" />
                    <div className="dot middle left" />
                    <div className="dot bottom left" />
                    <div className="dot top right" />
                    <div className="dot middle right" />
                    <div className="dot bottom right" />
                    
                    </>
                    );
                break;
        }
    }
    return (
        whichDie(props.value)
    )
}