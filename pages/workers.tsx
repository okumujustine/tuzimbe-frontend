import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import CustomModal from '../components/public/Modal'

import ClientWrapper from '../components/wrappers/ClientWrapper'
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

        const workers_or_error = await addWorker({
            first_name: firstName,
            last_name: lastName,
            main_daily_rate: parseInt(rate, 10)
        })
        if (typeof workers_or_error !== "string") {
            const new_workers_list = [...workers, workers_or_error]
            setWorkers(new_workers_list)
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
                    <h5 className="text-2xl">Workers</h5>
                </div>
                <button
                    className="my-6 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    onClick={onOpenModal}
                >
                    Add Worker
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
                <div>
                    {isLoading ? <div><p>Loading workers</p></div> : null}
                    <div>
                        {!error && !isLoading && workers.map(worker =>
                            <div key={worker.id}>
                                <p>{worker.first_name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ClientWrapper>
    )
}

export default WorkersPage
