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
            if (ObjectData?.MODULE_NAME === "Claim Status Master") {
                router.push(`/dashboard/master/claimMaster/claimStatusMaster`)
            }
            if (ObjectData?.MODULE_NAME === "Spares Parts Master") {
                router.push(`/dashboard/master/claimMaster/claimSparesPartsMaster`)
            }
            if (ObjectData?.MODULE_NAME === "List of Surveyors") {
                router.push(`/dashboard/master/claimMaster/claimListOfSurveyors`)
            }
            if (ObjectData?.MODULE_NAME === "Nature of Loss Master") {
                router.push(`/dashboard/master/claimMaster/claimNatureOfLossMaster`)
            }
            // else if (ObjectData?.MODULE_NAME === "Claim Status Master"){

            // }
            else{

                console.log(ObjectData?.MODULE_NAME);
            }
            // router.push(`/dashboard/master/masterModule/masterModuleChildList/masterModuleSubChildList/masterModuleSubChildDetail?data=${JSON.stringify(ObjectData)}`)
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
