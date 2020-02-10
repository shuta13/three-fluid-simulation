import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import Layout from '../components/common/Layout'

const Canvas = dynamic(
  () => import('../components/partials/Canvas'),
  { ssr: false }
)

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>
      <Canvas />
    </Layout>
  </div>
)

export default Home
