import React from 'react'
import { CartState } from '../context/Context'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import "./styles.css"

// Definition of Data Structures used
/**
 * @typedef {Object} products - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} type - The type that the t-shirt belongs to
 * @property {number} price - The price to buy the product
 * @property {string} color - The color of the product
 * @property {string} imageURL - Contains URL for the product image
 * @property {string} id - Unique ID for the product
 * @property {string} gender - Gender for t-shirts
 */

/**
 * @typedef {Object} filterState -  - filter object by useContext
 *
 * @property {array} byColor - Array of colors for filtering
 * @property {array} byGender - Array of Gender for filtering
 * @property {string} byPrice - price range value in form of string
 * @property {array} byType - Array of types of t-shirt for filtering
 * @property {string} searchQuery - query string
 */

const Home = () => {
    const {
            state:{products},
            filterState: { byColor, byGender, byPrice, byType, searchQuery }
          } = CartState();


    /**
 * Component to display the product filtered and unfiltered both
 *
 * @param { } products
 *    Takes product list directly from context
 * 
 * @returns { Array.<Product> }
 *   returns sorted products if filters are applied otherwise whole products
 *
 *
 */
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