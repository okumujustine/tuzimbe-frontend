import Link from 'next/link'
import React, { useEffect, useState } from 'react'


interface Props {
    searchResults: any[],
    searchValue: string,
    placeholder?: string,
    from: "material" | "worker"
    setSearchValue: (e: any) => void,
    searchingFunc: () => void,
    selectedOption: (option: any) => void
}

export default function Search({
    searchResults,
    searchingFunc,
    selectedOption,
    searchValue,
    setSearchValue,
    placeholder,
    from
}: Props) {
    const [searchInputControl, setSearchInputControl] = useState(false)
    const [searching, setSearching] = useState(false)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const searchNow = async () => {
        setSearchInputControl(false)
        setSearching(false)
        if (searchValue.length > 1) {
            setSearchInputControl(true)
            setSearching(true)

            await searchingFunc()
            setSearching(false)
        }
    }

    const onSelectOption = (searchResult: any) => {
        selectedOption(searchResult)
        setSearchValue("")
    }
    useEffect(() => {
        searchNow()
    }, [searchValue])
    return (
        <div>
            <input
                value={searchValue}
                onChange={(e) => onInputChange(e)}
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder ? placeholder : "placeholder here .."}
            />
            {searchInputControl ? <div className="bg-gray-100 mt-1 rounded-md px-4 py-3 text-base">
                {!searching && searchResults.length <= 0 ? <div>
                    <p>no results found
                        <Link href={from === "material" ? "/add-material" : "/workers"}><a className="text-blue-700 text-bold">{" "}{from === "material" ? "add material" : "add user"}</a></Link>
                    </p></div>
                    : null}
                {searching ? <div><p>searching....</p></div> : null}
                {!searching && searchResults.length > 0 ? <ul>
                    {searchResults.map(((searchResult: any) => {
                        return <>
                            <li key={searchResult.id} onClick={() => onSelectOption(searchResult)} className="p-3 hover:rounded-md hover:bg-gray-200">{searchResult.name}</li>
                        </>
                    }))}
                </ul> : null}
            </div> : null}
        </div>
    )
}
