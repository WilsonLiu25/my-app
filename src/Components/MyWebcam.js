import React from 'react';
import Webcam from 'react-webcam';
import Title from './Title';

class MyWebcam extends React.Component {
    constructor(props) {
        super(props)
        this.timerId = null;
        this.isCapturing = false; //setting a 'flag'
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    startCapturing = () => {
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            //console.log(image);

            this.fetchData(byteArrayImage);
        }, 200);
    }

    //another helper function to help convert basics for encoded strings to binary to send off to the vision API
    convertToByteArray = (image) => {
        const base64 = require('base64-js');
        const base64string = image.split(',')[1];
        
        return base64.toByteArray(base64string);
    }

    //this will take in the byte array and create a post request to the API endpoint
    fetchData = (byteArray) => {
        const apiKey = 'fede166e05a945d99204f20eef0d9df4';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var random = Math.floor((Math.random() * 2) + 1); 
                    var happiness = (data[0] != null ? data [0].faceAttributes.emotion.happiness:0);
                    happiness = (Math.round(happiness * 100));
                    
                    if(this.isCapturing && happiness < 100) {
                        this.props.onReceivedResult(happiness);
                    } else {    //if happiness is 100, stop the game
                        clearInterval(this.timerId);
                        this.isCapturing = false;
                        //console.log('stop');
                        this.props.onReceivedResult(100);

                    }


                })
            }
        });
    }
    

    
    render() {

        const videoConstraints = {
            Width: 750,
            heigh:500,
            facingMode: 'user'
        }

        return(
            <div>
                <div>
                    <Webcam
                        ref = {this.setRef}
                        audio = {false}
                        height = {250}
                        width = {375}
                        screenshotFormat = "image/jpeg"
                        videoConstraints = {videoConstraints}
                    />
                </div>

                <button variant = "primary" onClick = {this.startCapturing}>Start Game!</button>
                <p>Press start game to attempt one of Simon's commands!<br></br> Refresh the page to attempt another one of Simon's commands!</p>
                {/* <button onClick="window.location.href=window.location.href">Play again!</button> */}
            </div>
        )
    }


}

export default MyWebcam