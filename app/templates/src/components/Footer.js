import React from 'react'
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component{

    render(){
        return(        
        <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand>Copyright @Datastax</Navbar.Brand>
        </Navbar>
    </div>)
    };

};

export default Footer;