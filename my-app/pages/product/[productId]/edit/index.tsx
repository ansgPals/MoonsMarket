import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useAuth } from "../../../../src/commons/library/hocs/useAuth";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types";
import NewProductContainer from "../../../../src/components/units/product/newProduct/newProduct.container";

export const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
      }
      seller {
        _id
        email
        name
        picture
      }

      createdAt

      createdAt
    }
  }
`;
function ProductEditPage() {
  useAuth();
  const router = useRouter();

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USEDITEM, {
    variables: { useditemId: String(router.query.productId) },
  });

  return <NewProductContainer isEdit={true} data={data} />;
}

export default ProductEditPage;
