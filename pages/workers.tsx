import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import CustomModal from '../components/public/Modal'

import ClientWrapper from '../components/wrappers/ClientWrapper'
import { Workers } from '../helpers/workers/types'
import { getWorkers } from '../resource/getWorkers'


const WorkersPage: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [workers, setWorkers] = useState<Workers[]>([])
    const [error, setError] = useState<string>("")
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const getWorkersRequest = async () => {
        setLoading(true)

        const workers_or_error = await getWorkers()
        if (typeof workers_or_error !== "string") {
            console.log(workers_or_error)
            setWorkers(workers_or_error)
        } else {
            setError(workers_or_error)
        }

    }

    useEffect(() => {
        getWorkersRequest()
    }, [])

    const onAddWorker = () => {
        console.log("onAddWorker")
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
                        the modal to the moon
                    </div>
                </CustomModal>
                <div>
                    <div>
                        {!error && workers.map(worker =>
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
