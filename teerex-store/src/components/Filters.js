import React from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";

// Definition of Data Structures used
/**
 * @typedef {Object} filterState -  - filter object by useContext
 *
 * @property {array} byColor - Array of colors for filtering
 * @property {array} byGender - Array of Gender for filtering
 * @property {string} byPrice - price range value in form of string
 * @property {array} byType - Array of types of t-shirt for filtering
 * @property {string} searchQuery - query string
 */

const Filters = () => {
  const {
    filterDispatch,
    filterState: { byColor, byGender, byPrice, byType },
  } = CartState();

  // make state for rating
  const filterType = {
    color:['Red','Blue','Black','Pink','Green'],
    gender:['Men','Women'],
    price:['0-Rs250','Rs251-450','Rs500'],
    type:['Polo','Hoddie','Basic']
  }

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <label className="filterCategory">Colour</label>
      {
        filterType.color.map((colorOption,index)=>{
            return(
                <span style={{paddingLeft:10}}>
                    <Form.Check
                    inline
                    label={colorOption}
                    type="checkbox"
                    id = {"color"+{index}}
                    onChange={() =>
                        filterDispatch({
                        type: "FILTER_BY_COLOR",
                        payload: colorOption,
                        })
                    }
                    checked={byColor.includes(colorOption) ? true : false}
                    />
                </span>
            )
        })
      }
      <label className="filterCategory">Gender</label>
      {
        filterType.gender.map((genderItem,index)=>{
            return(
                <span style={{paddingLeft:10}}>
                    <Form.Check
                    inline
                    label={genderItem}
                    type="checkbox"
                    id = {"gender"+{index}}
                    onChange={() =>
                        filterDispatch({
                        type: "FILTER_BY_GENDER",
                        payload: genderItem,
                        })
                    }
                    checked={byGender.includes(genderItem) ? true : false}
                    />
                </span>
            )
        })
      }
      <label className="filterCategory">Price</label>
      {
        filterType.price.map((priceItem,index)=>{
            return(
                <span style={{paddingLeft:10}}>
                    <Form.Check
                    inline
                    label={priceItem}
                    name="priceFilter"
                    type="checkbox"
                    id = {"price"+{index}}
                    onChange={() =>
                        filterDispatch({
                        type: "FILTER_BY_PRICE",
                        payload: priceItem,
                        })
                    }
                    checked={(byPrice === priceItem) ? true : false}
                    />
                </span>
            )
        })
      }
      <label className="filterCategory">Type</label>
      {
        filterType.type.map((types,index)=>{
            return(
                <span style={{paddingLeft:10}}>
                    <Form.Check
                    inline
                    label={types}
                    type="checkbox"
                    id = {"type"+{index}}
                    onChange={() =>
                        filterDispatch({
                        type: "FILTER_BY_TYPE",
                        payload: types,
                        })
                    }
                    checked={byType.includes(types) ? true : false}
                    />
                </span>
            )
        })
      }
      
      <Button
        variant="light"
        onClick={() =>
          filterDispatch({
            type: "CLEAR_FILTERS",
          })
        }
        style={{marginTop:10}}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;