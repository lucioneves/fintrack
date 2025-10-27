import axios from 'axios'

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})
