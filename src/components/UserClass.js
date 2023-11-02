import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userInfo:{
                name:'dummyName',
                location:'defaultLoc',
                avatar_url:'https://dummy-photo.com'
            }
        }
    }

    async componentDidMount(){
      const data = await fetch('https://api.github.com/users/akshaymarch7')  
      const json = await data.json();
      console.log(json)
      this.setState({
        userInfo:json
      })
    }

    componentDidUpdate(){
        console.log('component updated');
    }

    componentWillUnmount(){
        console.log('component  unmounted from page')
    }


    render(){
        const{name,location,avatar_url} = this.state.userInfo;
   
        return(
            <div className="user-card">
                <img src={avatar_url} height={'150px'}/>
                <h2>Name: {this.state.userInfo.name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @akshaymarch7</h4>
            </div>
        )
    }
}

export default UserClass






