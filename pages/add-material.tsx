import React, { useEffect, useState } from 'react'
import ClientWrapper from '../components/wrappers/ClientWrapper'
import type { NextPage } from 'next'
import Back from '../components/Button/Back'
import Title from '../components/text/Title'
import { getMeasurementMethods } from '../resource/getMeasurementMethods'
import { delaySemulator } from '../helpers/utils'
import { MeasurementMethod } from '../helpers/materials/types'
import { addMaterial } from '../resource/addMaterial'

const AddMaterial: NextPage = () => {

    const [measurementMethods, setMeasurementMethods] = useState<MeasurementMethod[]>([])
    const [loadingMeasurementMs, setLoadingMeasurementMs] = useState(false)
    const [measurementMethod, setMeasurementMethod] = useState("")
    const [error, setError] = useState<string>("")
    const [name, setName] = useState<string>("")

    const getMeasurementMethodsRequest = async () => {
        setLoadingMeasurementMs(true)
        const ms = await getMeasurementMethods()

        await delaySemulator(2000)
        if (typeof ms !== "string") {
            setMeasurementMethods(ms)
            setLoadingMeasurementMs(false)
        } else {
            setError("error:getMeasurementMethodsRequest")
            setLoadingMeasurementMs(false)
        }
    }

    useEffect(() => {
        getMeasurementMethodsRequest()
    }, [])

    const handleMeasurementMethod = (e: any) => {
        setMeasurementMethod(e.target.value)
    }

    const onAddMaterial = async () => {
        if (!measurementMethod || !name) {
            alert("Make sure to enter name and chose a measurement method please!")
            return
        }
        await addMaterial({
            name: name,
            measurement_method: parseInt(measurementMethod, 10)
        })
        alert("material successfully added")
        setName("")
        setMeasurementMethod("")
    }


    return (
        <ClientWrapper>
            <div>
                <Back
                    link="/materials"
                />
                <Title text="Add material" />
                <div>
                    <div className="mt-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="quantity" />
                    </div>

                    <div className="mt-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Measurement</label>
                        {!loadingMeasurementMs && measurementMethods.length < 0 ? <p>no measurement method found ...</p> : null}
                        {loadingMeasurementMs ? <p>Loading measurement options ...</p>
                            : <div className="">
                                {measurementMethods.map(mm => <div key={mm.id}>
                                    <input type="radio" name="mm" value={mm.id} onChange={handleMeasurementMethod} />
                                    {mm.name}
                                </div>)}
                            </div>}
                    </div>

                    <button className="bg-gray-800 text-gray-50 rounded-md px-6 py-2 mt-5" onClick={onAddMaterial}>send</button>

                </div>
            </div>
        </ClientWrapper>
    )
}

export default AddMaterial