import React, { useEffect, useState } from 'react'
import { NextPage } from "next"
import ClientWrapper from '../components/wrappers/ClientWrapper'
import Search from '../components/public/Search'
import { delaySemulator } from '../helpers/utils'

const RegisterWorker: NextPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])

    const searchingFunc = async () => {
        console.log("---> keep searching ....")
        await delaySemulator(2000)
        setSearchResults([{ id: 1, name: "Justine" }, { id: 2, name: "okello" }])
        return "done"
    }

    const onSelectedOption = (option: any) => {
        console.log("option", option);
    }


    return (
        <ClientWrapper>
            <div>
                <Search
                    searchResults={searchResults}
                    searchingFunc={searchingFunc}
                    selectedOption={onSelectedOption}
                />

            </div>
        </ClientWrapper>
    )
}

export default RegisterWorker