import jsonPlaceholder from '../apis/jsonPlaceholder'

// Action creator
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log('about to post!')
  await dispatch(fetchPosts())

  const userIds = _.uniq(_.map(getState().posts, 'userId'))
  console.log(userIds)
  userIds.forEach((id) => dispatch(fetchUser(id)))
  console.log(getState().users)
}

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts')

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
  }
}

//two methods are the same for action creators

//non-memoize method
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`)
  console.log(response.data)
  dispatch({ type: 'FETCH_USER', payload: response.data })
}

//memoize
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch)
// }
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })
