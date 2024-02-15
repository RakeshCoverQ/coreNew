"use client"
import { useSelector } from "react-redux"

export default function Reports() {
    const Data = useSelector(state => state?.userInfo?.userData)
    return (
        <div>
            <p>{JSON.stringify(Data?.USER_NAME)}</p>
        </div>
    )
}
