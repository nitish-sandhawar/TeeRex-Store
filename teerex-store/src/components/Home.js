import React from 'react'
import { CartState } from '../context/Context'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import "./styles.css"

const Home = () => {
    const {
            state:{products},
            productState: { byColor, byGender, byPrice, byType, searchQuery }
          } = CartState();
    console.log(products)


    const transformProducts = () => {
      let sortedProducts = products;

      if(byColor.length){
        sortedProducts = sortedProducts.filter((prod)=>byColor.includes(prod.color))
      }
      if(byGender.length){
        sortedProducts = sortedProducts.filter((prod)=>byGender.includes(prod.gender))
      }
      if(byPrice.length){
          const range = byPrice.split("-");
          const numRegx = /\d/g;
          if(!range[1]){
            range[0] = Number(range[0].match(numRegx).join(""));
            sortedProducts = sortedProducts.filter((prod)=>prod.price<=range[0])
          }else{
            range[0] = Number(range[0].match(numRegx).join(""));
            range[1] = Number(range[1].match(numRegx).join(""));
            sortedProducts = sortedProducts.filter((prod)=>prod.price>=range[0]&&prod.price<=range[1])
          }
          console.log(range)
      }
      if(byType.length){
        sortedProducts = sortedProducts.filter((prod)=>byType.includes(prod.type))
      }
  
      if (searchQuery) {
        sortedProducts = sortedProducts.filter((prod) =>
          prod.name.toLowerCase().includes(searchQuery)
        );
      }
  
      return sortedProducts;
    };

  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {transformProducts().map((prod)=>{
          return <SingleProduct prod = {prod} key = {prod.id} />
        })}
      </div>
    </div>
  )
}

export default Home