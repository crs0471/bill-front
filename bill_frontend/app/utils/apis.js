import axios from "axios"
import { toast } from "./helper"
import { AsyncLocalStorageHelper } from "./helper"

export class NoAuthApiCaller {
    static async get(url) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try{
            const response = await axios.get(`${BASE_URL}${url}`)
            return response.data
        } catch (error) {
            toast.error(error.response.data.message)
            return null
        }
    }

    static async post(url, payload) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try {
            const response = await axios.post(`${BASE_URL}${url}`, payload)
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error.response.data.message)
            return null
        }
    }

    static async put(url, payload) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        const response = await axios.put(`${BASE_URL}${url}`, payload)
        return response
    }

    static async delete(url) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        const response = await axios.delete(`${BASE_URL}${url}`)
        return response
    }
}


export class ApiCaller {
    static async headers() {
        const accessToken = await AsyncLocalStorageHelper.getItem('accessToken')
        return  { 
            headers: { 
                'Authorization': `Bearer ${accessToken}`
            } 
        }
    }

    static async get(url, query_params={}) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try{
            if (query_params) {
                let q_slug = ''
                for (const key in query_params) {
                    q_slug += `${key}=${query_params[key]}&`
                }
                if (q_slug) {
                    url += `?${q_slug.slice(0, -1)}`
                }
            }
            const response = await axios.get(`${BASE_URL}${url}`, await this.headers())
            return response.data
        } catch (error) {
            console.log("🚀 ~ ApiCaller ~ get ~ error:", error)
            toast.error(error.response.data.message)
            return null
        }
    }

    static async post(url, payload) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try {
            const response = await axios.post(`${BASE_URL}${url}`, payload, await this.headers())
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error.response.data.message)
            return null
        }
    }

    static async put(url, payload) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try {
            const response = await axios.put(`${BASE_URL}${url}`, payload, await this.headers())
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error.response.data.message)
            return null
        }
    }

    static async patch(url, payload) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try {
            const response = await axios.patch(`${BASE_URL}${url}`, payload, await this.headers())
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            toast.error(error.response.data.message)
            return null
        }
    }

    static async delete(url) {
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        try {
            const response = await axios.delete(`${BASE_URL}${url}`, await this.headers())
            toast.success(response.data.message)
            return response.data
        } catch (error) {
            console.log("🚀 ~ ApiCaller ~ delete ~ error:", error)
            toast.error(error.response.data.message)
            return null
        }
    }
}
