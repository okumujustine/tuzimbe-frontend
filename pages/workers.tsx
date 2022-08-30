import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import CustomModal from '../components/public/Modal'
import Title from '../components/text/Title'

import ClientWrapper from '../components/wrappers/ClientWrapper'
import { delaySemulator } from '../helpers/utils'
import { Workers } from '../helpers/workers/types'
import { addWorker } from '../resource/addWorker'
import { getWorkers } from '../resource/getWorkers'


const WorkersPage: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [workers, setWorkers] = useState<Workers[]>([])
    const [error, setError] = useState<string>("")
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [rate, setRate] = React.useState("")

    const getWorkersRequest = async () => {
        setLoading(true)

        const workers_or_error = await getWorkers()
        await delaySemulator(2000)
        if (typeof workers_or_error !== "string") {
            setWorkers(workers_or_error)
        } else {
            setError(workers_or_error)
        }

        setLoading(false)

    }

    useEffect(() => {
        getWorkersRequest()
    }, [])

    const onAddWorker = async () => {

        if (!firstName || !lastName || !rate) {
            alert("Make sure rate, first name and last name are all entered")
            return
        }

        const workers_or_error = await addWorker({
            first_name: firstName,
            last_name: lastName,
            main_daily_rate: parseInt(rate, 10)
        })

        if (typeof workers_or_error !== "string") {
            const new_workers_list = [...workers, workers_or_error]
            setWorkers(new_workers_list)
            alert(`${firstName} ${lastName} successfully added!`)
        } else {
            setError(workers_or_error)
        }
        setIsOpen(false)

    }

    const onOpenModal = () => {
        setIsOpen(true)
    }
    const onCloseModal = () => {
        setIsOpen(false)
    }


    return (
        <ClientWrapper>
            <div>
                <div>
                    <Title text="List of all workers" />
                </div>
                <button
                    className="border text-gray-800 border-gray-800 rounded-full px-5 py-3 mt-3"
                    onClick={onOpenModal}
                >
                    Add new worker
                </button>
                <CustomModal
                    modalIsOpen={modalIsOpen}
                    closeModal={onCloseModal}
                    confirmButton={{
                        classes: "my-6 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    }}
                    onConfirm={onAddWorker}
                >
                    <div>
                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rate</label>
                                    <input
                                        onChange={(e) => setRate(e.target.value)}
                                        type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rate" />
                                </div>
                            </div>
                        </form>
                    </div>
                </CustomModal>
                <div className="mt-5">
                    {isLoading ? <div><p>Loading workers</p></div> :
                        <div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="border-b border-gray-900">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                        >
                                            FIRST NAME
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                        >
                                            LAST NAME
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                        >
                                            DAILY RATE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {workers && workers.map((worker) => (
                                        <tr key={worker.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-700">{worker.first_name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-700">{worker.last_name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-700">{worker.main_rate_currency} {worker.main_daily_rate}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </ClientWrapper>
    )
}

export default WorkersPage
