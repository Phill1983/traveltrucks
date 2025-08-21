import { createSlice } from '@reduxjs/toolkit'


const initialState = {
location: '',
form: '', // тип кузова / форма
features: { // множинні критерії
automatic: false,  // нове
petrol: false,
AC: false,
kitchen: false,
bathroom: false,
TV: false,
radio: false,
refrigerator: false,
microwave: false,
gas: false,
water: false,
},
}


const filtersSlice = createSlice({
name: 'filters',
initialState,
reducers: {
setLocation: (state, { payload }) => { state.location = payload },
setForm: (state, { payload }) => { state.form = payload },
toggleFeature: (state, { payload }) => { state.features[payload] = !state.features[payload] },
resetFilters: () => initialState,
}
})


export const { setLocation, setForm, toggleFeature, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer