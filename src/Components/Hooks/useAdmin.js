import { useEffect } from "react"
import { useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const email = user?.email;
        if (email) {

        }
    }, [user])
    return [admin]
}
export default useAdmin;