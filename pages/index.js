import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3 from 'web3';
import Web3Token from 'web3-token';
import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';


export default function Home() {
  const { publicRuntimeConfig } = getConfig();

  const [token, setToken] = useState(null);
  const web3 = new Web3(Web3.givenProvider);

  const authenticateUser = async () => {
    const accountsAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accountAddress = accountsAddress[0];

    if (accountAddress) {
      const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, accountAddress), '1d');
      setToken(token);

      if (token) {
        axios.post(`${publicRuntimeConfig.API_URL}/auth`, { wallet: accountAddress }, {
          headers: {
            'Authorization': token,
          },
          withCredentials: true
        });
      }

      return;
    } else {
      console.error('User didn\'t authenticate wallet');
      return;
    }
  };

  return (
    <div className={styles.container}>
      

      <Head>
        <title>Authenticate user using web3-token</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Authenticate user using web3-token
        </h1>

        <p className={styles.description}>
          Get started by{' '}
        
          <button onClick={authenticateUser}>authenticating your user</button>
        </p>
      </main>
    </div>
  )
}
