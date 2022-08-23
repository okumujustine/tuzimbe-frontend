import type { NextPage } from 'next'
import ReactModal from 'react-modal';

import ClientWrapper from '../components/wrappers/ClientWrapper'

const Home: NextPage = () => {
  ReactModal.setAppElement('#modals')
  return (
    <ClientWrapper>
      <div>
        <h1>Home screen Home screen Home screen Home screenHome screen Home screen</h1>
        <div id="modals" />
      </div>
    </ClientWrapper>
  )
}

export default Home
