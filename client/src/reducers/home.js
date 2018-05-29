import { format } from 'url'

export default (state = { articles: [] }, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.data.articles
      }
    case 'SUBMIT_ARTICLE':
      return {
        ...state,
        articles: [action.data.article].concat(state.articles),
        title: '',
        body: '',
        author: ''
      }
    case 'DELETE_ARTICLE':
      return {
        ...state,
        articles: state.articles.filter(article => article._id != action.id)
      }
    case 'SET_EDIT':
      return {
        ...state,
        article_id: action.article._id,
        title: action.article.title,
        body: action.article.body,
        author: action.article.author,
        isEdit: true
      }
    case 'EDIT_ARTICLE':
      return {
        ...state,
        articles: state.articles
          .filter(article => article._id != action.article._id)
          .concat(action.article)
          .sort((curr, next) => {
            curr = new Date(curr.createdAt)
            next = new Date(next.createdAt)
            return curr > next ? -1 : curr < next ? 1 : 0
          }),
        title: '',
        body: '',
        author: '',
        isEdit: false
      }
    case 'FORM_FIELD_CHANGE':
      return {
        ...state,
        title: action.data.title,
        body: action.data.body,
        author: action.data.author
      }
    default:
      return state
  }
}
