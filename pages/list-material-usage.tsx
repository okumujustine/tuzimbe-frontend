import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Title from '../components/text/Title'
import ClientWrapper from '../components/wrappers/ClientWrapper'
import { MaterialUsage } from '../helpers/materials/types'
import { delaySemulator, todaysDate } from '../helpers/utils'
import { getMaterialUsage } from '../resource/getMaterialUsage'

function ListMaterialUsage() {
    const [isLoading, setLoading] = useState(false)
    const [materialUsage, setMaterialUsage] = useState<MaterialUsage[]>([])
    const [error, setError] = useState<string>("")

    const getDailyMaterialsUsage = async () => {
        setLoading(true)
        const date = todaysDate()

        const material_usage = await getMaterialUsage({
            added_date: date
        })

        await delaySemulator(2000)
        if (typeof material_usage !== "string") {
            setMaterialUsage(material_usage)
            setLoading(false)
        } else {
            setError("error:materialUsage")
            setLoading(false)
        }
    }


    useEffect(() => {
        getDailyMaterialsUsage()
    }, [])

    return (
        <ClientWrapper>
            <div className="flex flex-col">
                <div>
                    <Title text={`Material usage for today (${todaysDate()})`} />
                </div>
                <div className="mt-5">
                    <Link href="/add-material-usage">
                        <a
                            className="border text-gray-800 border-gray-800 rounded-full px-5 py-3"
                        >Add material usage </a>
                    </Link>
                </div>
                <div>
                    <div className="mt-5">
                        {isLoading ? <div><p>Loading material usage ...</p></div> : null}
                        {!isLoading && materialUsage.length <= 0 ? <div>
                            <p>No material found, add materials to the usage list for today</p>
                        </div> : null}
                        {!isLoading && materialUsage.length > 0 ?
                            <div>
                                <div>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="border-b border-gray-900">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    NAME
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    MEASUREMENT
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    QUANTITY
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    PRICE
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {materialUsage.map((mu) => (
                                                <tr key={mu.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-700">{mu.material.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-700">{mu.measurement_method.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-700">{mu.quantity}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-700">{mu.price_currency} {mu.price}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </ClientWrapper>
    )
}

export default ListMaterialUsage