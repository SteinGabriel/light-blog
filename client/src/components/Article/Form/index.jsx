import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleChangeField = this.handleChangeField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const { isEdit } = this.props

    if (!isEdit) {
      this.submitArticle()
    } else {
      this.editArticle()
    }
  }

  submitArticle() {
    const { onSubmit, title, body, author } = this.props
    return axios
      .post('http://localhost:8000/api/articles', {
        title,
        body,
        author
      })
      .then(res => {
        onSubmit(res.data)
      })
      .catch(err => console.log('Error: ' + err))
  }

  editArticle() {
    const { onEdit, title, body, author, article_id } = this.props
    return axios
      .patch(`http://localhost:8000/api/articles/${article_id}`, {
        title,
        body,
        author
      })
      .then(res => {
        onEdit(res.data.articles)
      })
      .catch(err => console.log('Error: ' + err))
  }

  handleChangeField(key, event) {
    const { onFormTextChange } = this.props
    let data = {
      title: this.props.title,
      body: this.props.body,
      author: this.props.author
    }
    data[key] = event.target.value
    onFormTextChange(data)
  }

  render() {
    const { title, body, author } = this.props

    return (
      <div className="col-12 col-lg-8,">
        <input
          onChange={event => this.handleChangeField('title', event)}
          value={title}
          className="form-control my-3"
          placeholder="Article Title"
        />
        <textarea
          onChange={event => this.handleChangeField('body', event)}
          value={body}
          className="form-control my-3"
          rows="12"
          placeholder="Write your awesome article here :)"
        />

        <input
          onChange={event => this.handleChangeField('author', event)}
          value={author}
          className="form-control my-3"
          placeholder="Article Author"
        />
        <button
          className="btn btn-primary float-right"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  article_id: state.home.article_id,
  title: state.home.title,
  body: state.home.body,
  author: state.home.author,
  isEdit: state.home.isEdit
})

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: article => dispatch({ type: 'EDIT_ARTICLE', article }),
  onFormTextChange: data => dispatch({ type: 'FORM_FIELD_CHANGE', data })
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
