import { gql, OperationVariables, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IQuery } from "../../../src/commons/types/generated/types";
import BasketItemPage from "../../../src/components/units/basket/basketItem";

const Back = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

export const ChongBox = styled.div`
  width: 80rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  width: 80rem;
  padding: 0rem 7rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const SubTitle = styled.div`
  font-size: 2rem;
  color: #999999;
`;
export const RtBox = styled.div`
  font-size: 2rem;
  color: #5500ff;
  font-weight: bold;
`;
const PaymentButton = styled.button`
  height: 7rem;
  width: 30rem;
  font-size: 2.5rem;
  background-color: white;

  color: black;
  border: 2px solid #5500ff;
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    background-color: #5500ff;
    border: none;
    color: white;
  }
  margin-bottom: 5rem;
`;
export const CheckBox = styled.input`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 20px;
`;
export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
      userPoint {
        amount
      }
    }
  }
`;
export const CREATE_POINT_TRANSATION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;
export default function MyBasketPage() {
  const { data: userData } = useQuery<
    Pick<IQuery, "fetchUserLoggedIn">,
    OperationVariables
  >(FETCH_USER_LOGGED_IN, { variables: {} });
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSATION_OF_BUYING_AND_SELLING
  );
  const [basketItems, setBasketItems] = useState([]);
  const router = useRouter();
  const [buyingList, setBuyingList] = useState([]);
  const [buyingMoney, setBuyingMoney] = useState(0);
  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);

    let newBuyingMoney = 0;
    const buyingList = [];
    // eslint-disable-next-line array-callback-return
    baskets.map((el: any) => {
      newBuyingMoney += el.price;
      buyingList.push(el._id);
    });

    const setting = () => {
      setBuyingMoney(newBuyingMoney);
      setBuyingList(buyingList);
    };
    setting();
  }, []);

  const onClickPayment = async () => {
    if (userData?.fetchUserLoggedIn.userPoint.amount - buyingMoney < 0) {
      Modal.info({
        content: "?????? ???????????? ???????????????. ?????????????????? ???????????????.",
      });
      router.push(`/myPage/charge-point`);
      return;
    }

    try {
      await Promise.all(
        buyingList.map(
          (el) =>
            el &&
            createPointTransactionOfBuyingAndSelling({
              variables: { useritemId: el },
            })
        )
      );

      Modal.info({ content: `????????? ??????????????????!` });
    } catch (errors) {
      Modal.error({ content: errors.message });
    }
  };

  return (
    <>
      <Back>
        {" "}
        {basketItems.map((el) => (
          <BasketItemPage
            el={el}
            key={el._id}
            buyingList={buyingList}
            setBuyingList={setBuyingList}
            setBuyingMoney={setBuyingMoney}
          />
        ))}
        <ChongBox>
          <Row>
            <SubTitle>??? ????????????</SubTitle>
            <RtBox>{buyingMoney}???</RtBox>
          </Row>
          <Row>
            <SubTitle>??? ?????????</SubTitle>
            <RtBox style={{ color: "black" }}>
              {userData?.fetchUserLoggedIn.userPoint.amount}???
            </RtBox>
          </Row>
          <Row>
            <SubTitle>????????????????????????</SubTitle>
            <RtBox style={{ color: "black" }}>
              {userData?.fetchUserLoggedIn.userPoint.amount - buyingMoney}???
            </RtBox>
          </Row>
          <PaymentButton onClick={onClickPayment}>
            {buyingMoney}??? ????????????
          </PaymentButton>
        </ChongBox>
      </Back>
    </>
  );
}
