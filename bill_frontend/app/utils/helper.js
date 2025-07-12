import Swal from "sweetalert2"

export class toast {
    static success(message) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            toast: true,
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    static info(message) {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: message,
            toast: true,
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,

        })
    }
    static error(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            toast: true,
            position: 'top-end',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,

        })
    }
}

export const clearLocalStorage = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    console.log('local storage cleared')
}

export class AsyncLocalStorageHelper {

    static async setItem(key, value) {
        localStorage.setItem(key, value)
        const int = setInterval(() => {
            if (localStorage.getItem(key) === value) {
                int.clearInterval
                return true
            }
        }, 500)
    }

    static async getItem(key, maxTry=4) {
        let counter = 0
        let res = localStorage.getItem(key)
        console.log("🚀 ~ AsyncLocalStorageHelper ~ getItem ~ res:", res)
        const int = setInterval(() => {
            res = localStorage.getItem(key)
            counter += 1
            if (counter >= maxTry || res) {
                int.clearInterval
                return res
            }
        }, 500)

        return res
    }
}