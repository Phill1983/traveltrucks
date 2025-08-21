import { createSlice } from '@reduxjs/toolkit'


const KEY = 'tt_favorites'
const read = () => {
try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
const write = (arr) => { try { localStorage.setItem(KEY, JSON.stringify(arr)) } catch {} }


const initialState = { ids: read() }


const favoritesSlice = createSlice({
name: 'favorites',
initialState,
reducers: {
addFav: (state, { payload }) => {
if (!state.ids.includes(payload)) {
state.ids.push(payload)
write(state.ids)
}
},
removeFav: (state, { payload }) => {
state.ids = state.ids.filter(id => id !== payload)
write(state.ids)
},
}
})


export const { addFav, removeFav } = favoritesSlice.actions
export default favoritesSlice.reducer