import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Article extends Component {
  constructor(props) {
    super(props)
  }
  handleDelete(id) {
    const { onDelete } = this.props
    return axios
      .delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => onDelete(id))
      .catch(err => console.warn('Error deleting article ' + id + '. ' + err))
  }

  handleSetEdit(article) {
    const { setEdit } = this.props
    setEdit(article)
  }

  render() {
    const { article } = this.props
    return (
      <div key={article._id} className="card my-3">
        <div className="card-header">{article.title}</div>
        <div className="card-body">{article.body}</div>
        <div className="card-footer">
          <i>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(article._id)}
              style={{ marginRight: '10px' }}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleSetEdit(article)}
            >
              Edit
            </button>
            <div className="float-right">
              <p style={{ fontSize: '14px' }}>{article.author}</p>

              <p style={{ fontSize: '14px' }}>
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          </i>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles
})

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
  setEdit: article => dispatch({ type: 'SET_EDIT', article })
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
