"use client"
import React from 'react'
import styles from './masterModuleChildList.module.css'
import { useRouter, useSearchParams } from 'next/navigation';
export default function MasterModuleChildList() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const data = JSON.parse(searchParams.get('data'));
    const handleClick = (ObjectData) => {
        console.log(ObjectData);
        if (ObjectData?.M3) {
            
            router.push(`/dashboard/master/masterModule/masterModuleChildList/masterModuleSubChildList?data=${JSON.stringify(ObjectData)}`)
        }
        else{
            router.push(`/dashboard/master/masterModule/masterModuleChildList/masterModuleSubChildList/masterModuleSubChildDetail?data=${JSON.stringify(ObjectData)}`)
        }
    }
    return (
        <div className={styles.container}>
            {data?.M2?.map(item => {
                return (
                    <div onClick={() => handleClick(item)} className={styles.CardContainer}>
                        <p>{item.MODULE_NAME}</p>
                    </div>
                )
            })}
        </div>
    )
}
