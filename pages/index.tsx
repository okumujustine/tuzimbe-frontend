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

    const resp = await getWorkers()
    if (typeof resp !== "string") {
      setWorkers(resp.data)
    } else {
      setError(resp)
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
