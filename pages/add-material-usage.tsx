import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClientWrapper from '../components/wrappers/ClientWrapper'
import { delaySemulator } from '../helpers/utils'
import { searchWorkers } from '../resource/searchWorkers'
import Search from '../components/public/Search'
import { searchMaterials } from '../resource/searchMaterials'

const AddMaterialUsage: NextPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState("")

    const searchingFunc = async () => {
        const searchedMaterials = await searchMaterials({ name: searchValue })
        if (typeof searchedMaterials !== "string") {
            await delaySemulator(1000)
            setSearchResults(searchedMaterials)
        } else {
            // setError(workers_or_error)
            console.log("error feching use")
        }
        return true
    }

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

export default AddMaterialUsage