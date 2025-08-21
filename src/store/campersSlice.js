import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCampers } from '../api/campersApi'

const initialState = {
  items: [],
  page: 1,
  limit: 8,
  total: 0,
  loading: false,
  error: null,
}

export const fetchCampersThunk = createAsyncThunk(
  'campers/fetchList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const { page, limit } = state.campers
      const { location, form, features } = state.filters

     const params = { page, limit }
if (location?.trim()) params.location = location.trim()
if (form) params.form = form

// Мапінг обладнання з PDF → до бекенд параметрів
if (features.AC) params.AC = true
if (features.automatic) params.transmission = 'automatic'
if (features.petrol) params.engine = 'petrol'
;['kitchen','bathroom','TV','radio','refrigerator','microwave','gas','water']
  .forEach(k => { if (features[k]) params[k] = true })

      const { data, total } = await fetchCampers(params)
      return { data, total, append: page > 1 }
    } catch (err) {
      return rejectWithValue(err?.message || 'Fetch failed')
    }
  }
)

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    reset(state) {
      state.items = []
      state.page = 1
      state.total = 0
      state.error = null
    },
    nextPage(state) {
      state.page += 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCampersThunk.fulfilled, (state, { payload }) => {
        const { data, total, append } = payload
        state.loading = false
        state.total = Number(total) || 0
        state.items = append ? [...state.items, ...data] : data
      })
      .addCase(fetchCampersThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload || 'Request error'
      })
  },
})

export const { reset, nextPage } = campersSlice.actions
export default campersSlice.reducer
