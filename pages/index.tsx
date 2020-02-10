import React from 'react'
import Head from 'next/head'

import Layout from '../components/common/Layout'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>Hi There!</Layout>
  </div>
)

export default Home
