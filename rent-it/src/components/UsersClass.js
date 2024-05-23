import React from "react";

class UsersClass extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    componentWillUnmount(){
    }
    render(){
        const {component, name, location, contact} = this.props;

        return(
            <div className="user-card">
                <h1>{component}</h1>
                <h1>Name: {name}</h1>
                <h2>Address: {location}</h2>
                <h2>Contact: {contact}</h2>
                <h3>{this.state.count}</h3>
                <button onClick={() => this.setState({
                    count: this.state.count + 1
                })}>Increase Count Value</button>
            </div>
        )
    }
}

export default UsersClass;