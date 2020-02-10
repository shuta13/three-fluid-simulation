import React from 'react'
import Head from 'next/head'

import Layout from '../components/common/Layout'
import Canvas from '../components/partials/Canvas'

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
