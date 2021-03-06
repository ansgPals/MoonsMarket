import styled from "@emotion/styled";
import { useScroll } from "../../../commons/library/scrollHook";

interface IShowProps {
  show: number;
}
const TopButton = styled.button`
  width: 57px;
  height: 58px;
  display: ${(props: IShowProps) => (props.show > 100 ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 12;
  top: 28%;
  border: none;
  background: #ffffff;
  box-shadow: 0px 5px 35px rgba(23, 0, 58, 0.12);
  border-radius: 29px;
  :hover {
    box-shadow: 0px 5px 15px rgba(100, 0, 255, 0.15);
    .Arrow {
      background-image: url("/arrow-purple.png");
    }
  }
  right: 5%;
`;
const Arrow = styled.div`
  background-image: url("/arrow-black.png");
  background-size: cover;
  height: 22px;
  width: 13px;
`;

export default function TopButtonPage() {
  const { scrollY } = useScroll();
  const onClickRed = () => {
    if (!scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TopButton
      show={scrollY}
      style={{
        cursor: "pointer",
      }}
      onClick={onClickRed}
    >
      <Arrow className="Arrow" />
    </TopButton>
  );
}
