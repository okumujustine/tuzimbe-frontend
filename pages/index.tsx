import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ClientWrapper from '../components/wrappers/ClientWrapper'
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
    <ClientWrapper>
      <div>
        <h1>Home screen</h1>
      </div>
    </ClientWrapper>
  )
}

export default Home
