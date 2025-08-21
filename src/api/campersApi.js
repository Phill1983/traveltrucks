import axios from 'axios'


export const api = axios.create({
baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
})


function parsePaginatedResponse(res){
const body = res.data
// Випадок 1: масив (спрощений)
if (Array.isArray(body)) {
const totalFromHeader = Number(res.headers['x-total-count'])
return { data: body, total: Number.isFinite(totalFromHeader) ? totalFromHeader : body.length }
}
// Випадок 2: { data, pagination }
if (body && Array.isArray(body.data)) {
const total = body.pagination?.totalRecords ?? body.data.length
return { data: body.data, total }
}
// Фолбек
return { data: [], total: 0 }
}


export async function fetchCampers(params = {}) {
const res = await api.get('/campers', { params })
return parsePaginatedResponse(res)
}


export async function fetchCamperById(id) {
const { data } = await api.get(`/campers/${id}`)
return data
}