import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import Title from "../components/text/Title"
import ClientWrapper from "../components/wrappers/ClientWrapper"
import { Materials } from "../helpers/materials/types"
import { delaySemulator } from "../helpers/utils"
import { getMaterials } from "../resource/getMaterials"

const MaterialsPage: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [materials, setMaterials] = useState<Materials[]>([])
    const [error, setError] = useState<string>("")

    const getMaterialsRequest = async () => {
        setLoading(true)

        const materials_or_error = await getMaterials()
        await delaySemulator(2000)
        if (typeof materials_or_error !== "string") {
            setMaterials(materials_or_error)
        } else {
            setError(materials_or_error)
        }

        setLoading(false)

    }

    useEffect(() => {
        getMaterialsRequest()
    }, [])
    return <ClientWrapper>
        <div>
            <div>
                <Title text="List of all materials" />
            </div>
            <Link href="/add-material">
                <a
                    className="border text-gray-800 border-gray-800 rounded-full px-5 py-3 mt-3"
                >
                    Add new material
                </a>
            </Link>
            <div className="mt-5">
                {isLoading ? <div><p>Loading materials attendance...</p></div> : null}
                {!isLoading && materials.length <= 0 ? <div>
                    <p>No material found, add material</p>
                </div> : null}
                {!isLoading && materials.length > 0 ? <div className="flex flex-row flex-wrap">
                    {materials.map(m =>
                        <div key={m.id} className="w-2/12 mr-2 mb-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{m.name}</h5>
                            <p>Measurement: {m.mesurements[0].name}</p>
                        </div>)}
                </div> : null}
            </div>
        </div>
    </ClientWrapper>
}

export default MaterialsPage