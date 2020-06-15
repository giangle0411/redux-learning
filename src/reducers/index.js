import { combineReducers } from 'redux'

const songsReducer = () => {
  return [
    { title: 'Houdini', duration: '3:22' },
    { title: 'Salad Days', duration: '2:26' },
    { title: 'The World Is Watching', duration: '3:36' },
    { title: 'Sunflower', duration: '4:12' },
  ]
}

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload
  }
  return selectedSong
}

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
})
