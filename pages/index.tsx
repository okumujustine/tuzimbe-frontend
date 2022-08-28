import type { NextPage } from 'next'
import Link from 'next/link'
import Title from '../components/text/Title'

import ClientWrapper from '../components/wrappers/ClientWrapper'

const Home: NextPage = () => {
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
        <div id="modals" />
      </div>
    </ClientWrapper>
  )
}

export default Home
