import ProductCommentPage from "../../../src/components/units/product/productComment/productComment/productComment.container";
import ProductCommentListPage from "../../../src/components/units/product/productComment/ProductCommentList/productCommentList.container";
import ProductDetailContainer from "../../../src/components/units/product/productDetail/productDetail.container";

function ProductDetail() {
  return (
    <>
      <ProductDetailContainer />
      <ProductCommentPage />
      <ProductCommentListPage />
    </>
  );
}
export default ProductDetail;
