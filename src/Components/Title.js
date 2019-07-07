import React, {Component} from 'react';

class Title extends Component {
    render() {
        var random = Math.floor((Math.random() * 2) + 1);

        if(random == 1){
            return (
                <h1>Simon says... act surprised!</h1>

            )
        } else {
            return(
                <h1>Simon says... smile! </h1>
            )
        }
    }
}

export default Title