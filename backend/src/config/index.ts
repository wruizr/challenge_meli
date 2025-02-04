import dotenv from 'dotenv'

dotenv.config()

export const CONFIG = {
    API_BASE_URL_MELI: process.env.API_BASE_URL_MELI,
    PORT: process.env.PORT || 3000 
}

