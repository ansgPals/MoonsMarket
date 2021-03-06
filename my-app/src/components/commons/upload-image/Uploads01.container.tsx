import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { ChangeEvent, useRef } from "react";

import { checkValidationImage } from "./Uploads01.validation";
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
export const GrayBoxBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const GrayBox = styled.div`
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #bdbdbd;
  margin-right: 2rem;
  border-radius: 1rem;
  cursor: pointer;
`;

export const ImgBox = styled.img`
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  cursor: pointer;
`;

export const MyPlus = styled.div`
  font-size: 1.5rem;
  color: #4f4f4f;
`;
export const MyUpload = styled.div`
  font-size: 1.2rem;
  color: #4f4f4f;
`;
export interface IUploads01Props {
  index: number;
  fileUrl: string;
  defaultFileUrl?: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
}

export default function Uploads01(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(result.data.uploadFile.url, props.index);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };
  return (
    <>
      {props.fileUrl ? (
        <ImgBox
          onClick={onClickUpload}
          src={`https://storage.googleapis.com/${props.fileUrl}`}
        />
      ) : (
        <GrayBox onClick={onClickUpload}>
          <MyPlus>+</MyPlus>
          <MyUpload>Upload</MyUpload>
        </GrayBox>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
      />
    </>
  );
}
