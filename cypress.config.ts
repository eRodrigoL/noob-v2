import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

// Carrega variáveis do .env
dotenv.config()

export default defineConfig({
  env: {
    apiUrl: process.env.EXPO_PUBLIC_API_BASE_URL, 
    testUsername: process.env.CYPRESS_TEST_USERNAME,
    testPassword: process.env.CYPRESS_TEST_PASSWORD,
  },
  e2e: {
    baseUrl: 'http://localhost:8081', 
  }
})

