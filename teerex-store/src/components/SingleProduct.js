import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";


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

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.imageURL} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price}</span>
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
            >
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;