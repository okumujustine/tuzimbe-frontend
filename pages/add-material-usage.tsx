import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClientWrapper from '../components/wrappers/ClientWrapper'
import { delaySemulator } from '../helpers/utils'
import Search from '../components/public/Search'
import { searchMaterials } from '../resource/searchMaterials'
import { Materials } from '../helpers/materials/types'
import { addMaterialUsage } from '../resource/addMaterialUsage'
import Title from '../components/text/Title'
import Back from '../components/Button/Back'

const AddMaterialUsage: NextPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [selectedMaterial, setSelecetedMaterial] = useState<Materials | null>(null)
    const [measurementMethod, setMeasurementMethod] = useState()
    const [materialPrice, setMaterialPrice] = useState("")
    const [materialQty, setMaterialQty] = useState("")


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

    const onSelectedOption = (material: any) => {
        setSelecetedMaterial(material)
    }

    const handleMeasurementMethod = (e: any) => {
        setMeasurementMethod(e.target.value)
    }

    const onAddMaterialUsage = async () => {
        if (!selectedMaterial || !measurementMethod || !materialPrice || !materialQty) {
            alert("select measurementMethod, set materialQty and set materialPrice")
            return
        }
        await addMaterialUsage({
            measurement_method: parseInt(measurementMethod as unknown as string, 10),
            material: selectedMaterial?.id,
            quantity: parseInt(materialQty as unknown as string, 10),
            price: parseInt(materialPrice as unknown as string, 10)
        })
        alert("material usage successfully added")
        setSelecetedMaterial(null)
    }

    return (
        <ClientWrapper>
            <div>
                <Back
                    link="/list-material-usage"
                />
                <Title text="Add material usage for today (sand, cement, bricks, nails)" />
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    searchResults={searchResults}
                    searchingFunc={searchingFunc}
                    selectedOption={onSelectedOption}
                />
                <div className="mt-20">
                    {selectedMaterial ?
                        <div>
                            <p>Name: {selectedMaterial.name}</p>
                            <div className="mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Measurement method</label>
                                {selectedMaterial.mesurements.map(mm => <>
                                    <input type="radio" name="mm" value={mm.id} onChange={handleMeasurementMethod} />
                                    {mm.name}
                                </>)}
                            </div>
                            <div className="mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                                <input
                                    type="number"
                                    value={materialQty}
                                    onChange={(e) => setMaterialQty(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="quantity" />
                            </div>
                            <div className="mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                                <input
                                    type="number"
                                    value={materialPrice}
                                    onChange={(e) => setMaterialPrice(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="price" />
                            </div>
                            <button className="bg-gray-800 text-gray-50 rounded-md px-6 py-2 mt-5" onClick={onAddMaterialUsage}>send</button>
                        </div>
                        : null}
                </div>
            </div>
        </ClientWrapper >
    )
}

export default AddMaterialUsage