import User from './User'
import UserClass from './UserClass';
import React from 'react';

class About extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        
    }


    render(){
        return(
            <div>
                <h1>About</h1>
                <h2>this is NMJs course</h2>
                
                <UserClass name={'Akshay Saini'} location={"dehardun"} />
            </div>
        )
    }
}


export default About ;
