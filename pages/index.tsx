import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Title from '../components/text/Title'

import ClientWrapper from '../components/wrappers/ClientWrapper'
import { todaysDate } from '../helpers/utils'
import { WorkerAttendance } from '../helpers/workers/types'
import { workersAttendance } from '../resource/workerAttendance'

const Home: NextPage = () => {

  const [isLoading, setLoading] = useState(false)
  const [attendance, setAttendance] = useState<WorkerAttendance[]>([])
  const [error, setError] = useState<string>("")

  const getDailyAttendance = async () => {
    setLoading(true)
    const date = todaysDate()

    const dailyAttendance = await workersAttendance({
      added_date: date
    })
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

  return (
    <ClientWrapper>
      <div className="flex flex-col">
        <div>
          <Title text="Workers attendance today" />
        </div>
        <div className="mt-5">
          <Link href="/register-worker">
            <a
              className="border text-gray-800 border-gray-800 rounded-full px-5 py-3"
            >Register worker</a>
          </Link>
        </div>
        <div>
          <div>
            {isLoading ? <div><p>Loading workers attendance</p></div> : null}
            <div>
              {!error && !isLoading && attendance.map(a =>
                <div key={a.id}>
                  <p>{a.worker.first_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="modals" />
      </div>
    </ClientWrapper>
  )
}

export default Home
