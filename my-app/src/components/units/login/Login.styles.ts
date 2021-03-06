import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin-top: 100px;
  width: 500px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const Logo = styled.div`
  font-size: 30px;
  font-family: "SUIT700";
  margin-bottom: 40px;
`;

export const Button = styled.button`
  color: white;
  font-family: "SUIT600";
  font-size: 15px;
  width: 300px;
  height: 50px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  text-align: center;
  background-color: #6400ff;
  margin-bottom: 15px;
`;
export const PositionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  color: black;
`;
export const GoSignup = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;
export const Text = styled.div`
  font-family: "SUIT400";
  font-size: 15px;
  line-height: 15px;
`;

interface IInputProps {
  error?: string;
  inner?: string;
  focus?: boolean;
}
export const LoginInput = styled.input`
  width: 300px;
  min-height: 50px;
  line-height: 3.2rem;
  padding: 0rem 20px;
  border: ${(props: IInputProps) =>
    props.error
      ? " 1px solid #FF0000"
      : props.inner === ""
      ? "1px solid #c7c7c7"
      : "1px solid rgba(100, 0, 255, 0.6)"};

  border-radius: 10px;
  font-size: 15px;
  font-family: "SUIT500";

  ::placeholder {
    color: #999999;
    font-family: "SUIT";
  }
  :focus {
    border: 2px solid rgba(100, 0, 255, 0.6);
    outline: none;
  }
`;
export const PassInput = styled.input`
  width: 240px;
  min-height: 50px;
  font-size: 15px;
  font-family: "SUIT500";
  border: none;
  ::placeholder {
    color: #999999;
    font-family: "SUIT";
    outline: none;
  }
  :focus {
    outline: none;
  }
`;
export const LoginInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;

  padding: 0rem 15px;
  border: ${(props: IInputProps) =>
    props.error
      ? " 1px solid #FF0000"
      : props.inner === ""
      ? "1px solid #c7c7c7"
      : "1px solid rgba(100, 0, 255, 0.6)"};
  border-radius: 10px;
  font-size: 15px;
  font-family: "SUIT500";

  ${(props) =>
    props.focus && {
      border: "2px solid rgba(100, 0, 255, 0.6)",
      outline: "none",
    }}
`;
export const InputErr = styled.div`
  width: 280px;
  height: 20px;
  color: #e72a2a;
  font-family: "SUIT400";
  font-size: 10px;
`;
export const InputIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
