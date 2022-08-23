import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Workers } from '../helpers/workers/types'
import { getWorkers } from '../resource/getWorkers'

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [workers, setWorkers] = useState<Workers[]>([])
  const [error, setError] = useState<string>("")

  const getWorkersRequest = async () => {
    setLoading(true)

    const workers_or_error = await getWorkers()
    if (typeof workers_or_error !== "string") {
      setWorkers(workers_or_error.data)
    } else {
      setError(workers_or_error)
    }

  }

  useEffect(() => {
    getWorkersRequest()
  }, [])

  return (
    <h1 className="text-3xl font-bold underline text-red-700">
      Hello world!
    </h1>
  )
}

export default Home
