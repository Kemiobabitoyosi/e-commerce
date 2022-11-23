import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Overlay from "./components/overlay.jsx";
import { ApolloProvider } from "@apollo/client";
import ApolloClient, { gql } from "apollo-boost";
import Home from "./views/Home.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ProductInfo from "./views/ProductInfo";
import CartView from "./views/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <CartView />,
  },
  {
    path: "/product/:productId",
    element: <ProductInfo />,
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

const LAUNCH_QUERY = gql`
  query {
    categories {
      name
      products {
        name
        gallery
      }
    }
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    // this.loadMoreCommit = this.loadMoreCommit.bind(this);
  }

  render() {
    return (
      <RouterProvider router={router}>
        <ApolloProvider client={client}>
          <div className="App"></div>
        </ApolloProvider>
      </RouterProvider>
    );
  }
}

export default App;
