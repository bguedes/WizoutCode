import { gql } from "@apollo/client";

const getBooksQuery = gql`
    {
        books {
            title
        }
    }
`

const addBookMutation = gql`
    mutation ($title: String, $author: String, $genre: String){
        addBook: insertBooks(value: {
            title:$title,
            author:$author,
            genre:$genre,
            year:2020}) {
                value  {
                    title
                }
        }
    }   
`;

const getBookQuery = gql`
    query ($title: String) {
        book(title: $title) {
            title
            author
            genre
            year
        }
    }
`

export { addBookMutation, getBookQuery, getBooksQuery}