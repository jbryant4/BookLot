import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context'

//pages
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
//component
import Navbar from './components/Navbar';


//establish link to the GQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// sett the header of every request with the user auth token form localStorage
const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ... headers,
      authorization: token ? `Bearer ${token}`: '',
    },
  };
});

//make a connection to the api end points
const client = new ApolloClient({
  //making sure every request has a token before making api request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloClient client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloClient>
  );
}

export default App;
