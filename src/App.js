import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'

class App extends Component {
  render() {
    return (
      <Layout>
        <div style={{width: 400, border: '1px solid #ccc'}}>
          <h1>Layout</h1>
        </div>
      </Layout>
    );
  }
}

export default App;
