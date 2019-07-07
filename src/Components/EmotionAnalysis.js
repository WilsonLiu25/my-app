import React from 'react'
import MyWebcam from './MyWebcam'
import {useState} from 'react'


function EmotionAnalysis() {
    const [result, updateResult] = useState(0);

    return (
        <div>
            <div>
                <MyWebcam onReceivedResult={updateResult}/>
                <Result result={result}/>
            </div>
        </div>
    
    )
}

function Result(props) {
    return (
        <div>
            <h1>{props.result < 100 ? props.result + "%" : "Good job!"} </h1>
        </div> 
    )
}

export default EmotionAnalysis;