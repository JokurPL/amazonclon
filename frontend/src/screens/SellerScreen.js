import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";

function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <div className="small">
                    <img src={user.seller.logo} alt={user.seller.name} />
                  </div>
                  <div className="p-1">
                    <h1>{user.seller.name}</h1>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              />
            </li>
            <li>
              <a href={`mailto: ${user.email}`}>Contact seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox variant="error">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No product found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerScreen;
