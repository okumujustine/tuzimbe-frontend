import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";

import CustomModal from '../components/public/Modal'
import Title from '../components/text/Title'
import ClientWrapper from '../components/wrappers/ClientWrapper'
import { toastError, toastSuccess } from '../helpers/toast';
import { delaySemulator, timeFromDateTime, todaysDate } from '../helpers/utils'
import { WorkerAttendance } from '../helpers/workers/types'
import { addDepartureTime } from '../resource/addDepartureTime';
import { workersAttendance } from '../resource/workerAttendance'
// import "../styles/custom.css"

const Home: NextPage = () => {

  const [isLoading, setLoading] = useState(false)
  const [attendance, setAttendance] = useState<WorkerAttendance[]>([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<WorkerAttendance | null>(null)
  const [error, setError] = useState<string>("")
  const [departureTime, setDepartureTime] = useState(new Date());


  const getDailyAttendance = async () => {
    setLoading(true)
    const date = todaysDate()

    const dailyAttendance = await workersAttendance({
      added_date: date
    })
    await delaySemulator(2000)
    if (typeof dailyAttendance !== "string") {
      setAttendance(dailyAttendance)
      setLoading(false)
    } else {
      setError("error:dailyAttendance")
      setLoading(false)
    }
  }


  useEffect(() => {
    getDailyAttendance()
  }, [])

  const onDepart = (a: WorkerAttendance) => {
    setSelectedAttendance(a)
    setIsOpen(true)
  }

  const updateAttendance = async () => {
    if (!departureTime) {
      toastError("Enter departure time please")
      return
    }
    const dt = departureTime.toJSON()

    var index = attendance.findIndex(att => att.id === selectedAttendance?.id);

    await addDepartureTime({
      departure_time: dt,
      attendence_pk: selectedAttendance?.id as unknown as number
    })

    if (index === -1) {
      toastError("Please select attendance")
    } else {
      const obj = attendance[index]
      obj.departure_time = dt
      attendance.splice(index, 1)
      setAttendance([...attendance, obj])
    }
    toastSuccess(`departure time for ${selectedAttendance?.worker.first_name} ${selectedAttendance?.worker.last_name} succefully updated`)
    setIsOpen(false)
  }

  const handleDepartureTimeChange = (dateTime: any) => {
    setDepartureTime(dateTime)
  }

  return (
    <ClientWrapper>
      <div className="flex flex-col">
        <div>
          <Title text={`Workers attendance today (${todaysDate()})`} />
        </div>
        <CustomModal
          modalIsOpen={modalIsOpen}
          closeModal={() => setIsOpen(false)}
          confirmButton={{
            classes: "my-6 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          }}
          onConfirm={updateAttendance}
        >
          <div className="h-40">
            <p>Add or update departure time for {selectedAttendance?.worker.first_name} {selectedAttendance?.worker.last_name}</p>
            <div className="my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arrival time</label>

              <DatePicker
                selected={departureTime}
                className="border border-gray-500 rounded-md p-1"
                onChange={(date) => handleDepartureTimeChange(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </CustomModal>
        <div className="mt-5">
          <Link href="/register-worker">
            <a
              className="border text-gray-800 border-gray-800 rounded-full px-5 py-3"
            >Register worker</a>
          </Link>
        </div>
        <div>
          <div className="mt-5">
            {isLoading ? <div><p>Loading workers attendance...</p></div> : null}
            {!isLoading && attendance.length <= 0 ? <div>
              <p>No worker found, add workers to the attendance list for today</p>
            </div> : null}
            {!isLoading && attendance.length > 0 ? <div>
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        ARRIVAL TIME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        DEPARTURE TIME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                      >
                        EDIT
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendance.map((a) => (
                      <tr key={a.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-700">{a.worker.first_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-700">{a.worker.last_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-700">{a.daily_rate_currency} {a.daily_rate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-700">{timeFromDateTime(a.arrival_time)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-700">{a.departure_time ? timeFromDateTime(a.departure_time) : <span className="text-gray-400">not added</span>}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              onClick={() => onDepart(a)}
                              className="text-sm font-medium text-gray-100 bg-gray-800 px-2 py-1 rounded-full"
                            >depart</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> : null
            }
          </div>
        </div>
        <div id="modals" />
      </div>
    </ClientWrapper>
  )
}

export default Home
