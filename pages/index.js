import React,{useState} from 'react'
import axios from 'axios'
import Head from 'next/head'
import Add from '../component/Add'
import AddButton from '../component/AddButton'
import Featured from '../component/Featured'
import PizzaList from '../component/PizzaList'


export default function Home({pizzaList,admin}) {
  const [close, setClose] = useState(true);
  return (
    <div >
      <Head>
        <title>Pizza amine </title>
        <meta name="description" content="best pizza amine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {<AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}
 export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";
  let admin = true;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }


  const res =  await axios.get("http://localhost:3000/api/products");
  return {
   props: {
    pizzaList: res.data,
    admin
  } ,
  };
 };