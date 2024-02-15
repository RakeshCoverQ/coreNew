"use client"
import React from 'react'
import { useSelector } from "react-redux"
import styles from './masterModules.module.css'
import { useRouter } from 'next/navigation';


export default function MasterModules() {
    const router = useRouter();
    const Data = useSelector(state => state?.userInfo?.userData?.DATA)
    const List = Data?.filter(i => i.MODULE_NAME === "Masters")
    const handleClick = (ObjectData) => {
        console.log("handleClick", ObjectData);
        // router.push(`/dashboard/master/masterModule/masterModuleChildList?${e}`);
        router.push(`/dashboard/master/masterModule/masterModuleChildList?data=${JSON.stringify(ObjectData)}`)
    }
    return (
        <>
            <div className={styles.container}>
                {List[0]?.M1?.map(item => {
                    return (
                        <div onClick={() => handleClick(item)} className={styles.CardContainer}>
                            <p>{item.MODULE_NAME}</p>
                        </div>
                    )
                })}
            </div>  
        </>
    )
}
