import React, { useEffect, useState } from 'react'
import { NextPage } from "next"
import ClientWrapper from '../components/wrappers/ClientWrapper'
import Search from '../components/public/Search'
import { delaySemulator, todaysDate } from '../helpers/utils'
import { searchWorkers } from '../resource/searchWorkers'
import Title from '../components/text/Title'
import Back from '../components/Button/Back'
import { Workers } from '../helpers/workers/types'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addWorkersAttendance } from '../resource/addWorkerAttendance'

const RegisterWorker: NextPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [selectedWorker, setSelectedWorker] = useState<Workers | null>(null)
    const [workerRate, setWorkerRate] = useState("")
    const [startDate, setStartDate] = useState(new Date());

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
        setWorkerRate(option.main_daily_rate)
        setSelectedWorker(option)
    }

    const handleDateChange = (e: any) => {
        setStartDate(e)
    }

    const onAddAttendance = async () => {
        if (!startDate || !workerRate) {
            alert("All fields are required")
            return
        }
        const att = await addWorkersAttendance({
            "worker": selectedWorker?.id as number,
            "arrival_time": startDate.toJSON(),
            "daily_rate": parseInt(workerRate, 10),
            "added_date": todaysDate()
        })
        if (typeof att !== "string") {
            alert("User added successfully")
            setSelectedWorker(null)
        } else {
            alert(att)
            setSelectedWorker(null)
            // setError("error:dailyAttendance")
            // setLoading(false)
        }
    }


    return (
        <ClientWrapper>
            <div>
                <Back
                    link="/"
                />
                <Title text="Add worker to today's attendance list" />
                <div>
                    <Search
                        placeholder="search worker here ..."
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        searchResults={searchResults}
                        searchingFunc={searchingFunc}
                        selectedOption={onSelectedOption}
                    />

                </div>
                <div className="mt-5">
                    {selectedWorker ?
                        <div>
                            <div className="mb-6">
                                <p>Name: {selectedWorker.first_name} {selectedWorker.last_name}</p>
                                <p>Main Rate: {selectedWorker.main_rate_currency} {selectedWorker.main_daily_rate}</p>
                            </div>
                            <hr />
                            <div className="mt-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Worker rate (<span className="text-blue-800">Editable</span>)</label>
                                    <input
                                        type="number"
                                        value={workerRate}
                                        onChange={(e) => setWorkerRate(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
                                </div>
                                <div className="my-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arrival time</label>

                                    <DatePicker
                                        className="border border-gray-500 rounded-md p-1"
                                        calendarClassName="bg-white"
                                        wrapperClassName="bg-white"
                                        selected={startDate}
                                        onChange={(date) => handleDateChange(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                                <button
                                    className="bg-gray-800 text-gray-50 rounded-md px-6 py-2 mt-5"
                                    onClick={onAddAttendance}>send</button>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </ClientWrapper>
    )
}

export default RegisterWorker