import type { NextPage } from 'next'
import Link from 'next/link'

import ClientWrapper from '../components/wrappers/ClientWrapper'

const Home: NextPage = () => {
  return (
    <ClientWrapper>
      <div>
        <h1>Home screen Home screen Home screen Home screenHome screen Home screen</h1>
        <Link href="/register_worker">
          <a>Register worker</a>
        </Link>
        <div id="modals" />
      </div>
    </ClientWrapper>
  )
}

export default Home
