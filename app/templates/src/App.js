import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
//  components
import AddBook from "./components/AddBook"

const client = new ApolloClient({
  uri: 'http://192.168.16.5:8080/graphql/hackaton',
  //uri: 'https://46bb18c8-6786-4594-b3e4-bdd0c53e82c3-europe-west1.apps.astra.datastax.com/api/graphql/hackathon',
  cache: new InMemoryCache(),
  headers: {
    "X-Cassandra-Token": "d7b8afe6-953a-415a-90bc-46ec3a1400fd"
  },
  fetchOptions: {
    mode: 'no-cors',
  }
});

const App = () => {

  return (

    <ApolloProvider client={client}>
      <Container className="p-3">
        <Jumbotron>
          <Header></Header>
            <AddBook />
            <Footer></Footer>
        </Jumbotron>
      </Container>
  </ApolloProvider>
  );
};

export default App;
