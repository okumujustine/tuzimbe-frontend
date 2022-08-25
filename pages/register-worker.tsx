import React, { useEffect, useState } from 'react'
import { NextPage } from "next"
import ClientWrapper from '../components/wrappers/ClientWrapper'
import Search from '../components/public/Search'
import { delaySemulator } from '../helpers/utils'
import { searchWorkers } from '../resource/searchWorkers'

const RegisterWorker: NextPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState("")

    const searchingFunc = async () => {
        const searchedWorkers = await searchWorkers({ name: searchValue })
        if (typeof searchedWorkers !== "string") {
            const new_searched_workers: any[] = []
            searchedWorkers.map(workers => {
                new_searched_workers.push({ name: `${workers.first_name} ${workers.last_name}`, ...workers })
            })
            await delaySemulator(1000)
            setSearchResults(new_searched_workers)
        } else {
            // setError(workers_or_error)
            console.log("error feching use")
        }
        return true
    }

    // searchWorkers

    const onSelectedOption = (option: any) => {
        console.log("option", option);
    }


    return (
        <ClientWrapper>
            <div>
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchResults={searchResults}
                    searchingFunc={searchingFunc}
                    selectedOption={onSelectedOption}
                />

            </div>
        </ClientWrapper>
    )
}

export default RegisterWorker