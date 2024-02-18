"use client"
import React from 'react'
import styles from './masterModuleSubChildList.module.css'
import { useRouter, useSearchParams } from 'next/navigation';

export default function MasterModuleSubChildList() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const data = JSON.parse(searchParams.get('data'));
    const handleClick = (ObjectData) => {

        console.log('ObjectData',ObjectData);
        router.push(`/dashboard/master/masterModule/masterModuleChildList/masterModuleSubChildList/masterModuleSubChildDetail?data=${JSON.stringify(ObjectData)}`)
    }
    return (
        <div className={styles.container}>
            {data?.M3?.map(item => {
                return (
                    <div onClick={() => handleClick(item)} className={styles.CardContainer}>
                        <p>{item.MODULE_NAME}</p>
                    </div>
                )
            })}
        </div>
    )
}
