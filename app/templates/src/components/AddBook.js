import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { addBookMutation, getBooksQuery } from "../queries/Queries"

class AddBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            genre: "",
            author: "",
            language: ""
        }
    }

    submitForm(e){
        e.preventDefault();
        console.log(this.state)
        this.props.addBookMutation({
            variables: {
                title: this.state.title,
                genre: this.state.genre,
                author: this.state.author,
                year: this.state.year
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        this.setState({
            title: '',
            genre: '',
            author: '',
            language: ''
        })
    }

    render() {
        return (
            <div>
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Title:</label>
                    <input type="text" onChange={ (e) => this.setState({title: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <input type="text" onChange={ (e) => this.setState({author: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({genre: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Year:</label>
                    <input type="text" onChange={ (e) => this.setState({year: e.target.value})}/>
                </div>
                <button class="btn btn-success" data-toggle="modal">  <span>Add</span></button>

            </form>
            </div>
        );
    }  
};

export default graphql(addBookMutation, { name: "addBookMutation" })(AddBook)