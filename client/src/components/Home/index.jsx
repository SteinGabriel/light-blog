import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Form from '../Article/Form'
import Article from './Article'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { onLoad } = this.props

    axios('http://localhost:8000/api/articles').then(res => {
      onLoad(res.data)
    })
  }

  render() {
    // Gets all articles from props
    const { articles } = this.props
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Light Blog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offfset-lg-3">
            {articles.map(article => {
              return (
                <div key={article._id}>
                  <Article article={article} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles
})

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data })
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
