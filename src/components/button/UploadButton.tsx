import { FC, useCallback, useRef, useState } from "react";
import { styled } from "styled-components";
import Button from "components/button/button";
import { ReactComponent as RefreshIcon } from "assets/images/RefreshIcon.svg";
import { postImageToAwsApi } from "api/common/common";
import { toast } from "react-toastify";
import { ReactComponent as Loading } from "assets/images/Loading.svg";

const Styled = {
  Wrap: styled.div`
    position: relative;
  `,
  ButtonUpload: styled(Button)<any>`
    margin-left: 28px;
    min-width: 185px;
    margin-right: 24px;
    border-color: ${({ isError }) =>
      isError ? "#b41c1c" : "#59a52c"} !important;
    @media (max-width: 1300px) {
      margin-left: 10px;
      margin-right: 10px;
    }
    .requited {
      color: #b41c1c;
    }
    svg {
      height: 15px;
      position: relative;
      bottom: -2px;
    }
  `,
  UploadedValue: styled.div`
    color: #59a52c;
    display: flex;
    padding: 0px 10px;
    margin-left: 28px;
    align-items: center;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-word;
      white-space: normal;
      svg {
        height: 15px;
        position: relative;
        bottom: -2px;
      }
    }
    .icon {
      cursor: pointer;
    }
  `,
  ErrorMessage: styled.div`
    display: block;
    text-align: right;
    color: #b41c1c;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    position: absolute;
    left: 30px;
    bottom: -23px;
  `,
};

interface Props {
  uploadedFile?: {
    imageName: string;
    imageLink: string;
  };
  onChange: (file?: FileList | null) => void;
  error?: string;
}

const UploadButton: FC<Props> = ({ uploadedFile, onChange, error }) => {
  const fileUpload = useRef<any>(null);
  const [loading, setIsLoading] = useState(false);
  const onChangeFile = useCallback(
    (event: any) => {
      const { files } = event.target;
      const formData = new FormData();
      formData.append("file", files?.[0]);
      setIsLoading(true);
      postImageToAwsApi(formData)
        .then((res) => onChange(res?.data))
        .catch((error) =>
          toast.error(error?.message || "Something went wrong when upload!")
        )
        .finally(() => setIsLoading(false));
    },
    [onChange]
  );
  const handleUpload = useCallback(() => {
    if (!loading) {
      fileUpload?.current?.click?.();
    }
  }, [loading]);

  return (
    <Styled.Wrap>
      <label htmlFor="file-input">
        <input
          // accept={FILE_EXTENSION_WHITE_LIST}
          type="file"
          ref={fileUpload}
          hidden
          onChange={onChangeFile}
          onClick={(event: any) => {
            event.target.value = null;
          }}
        />
      </label>
      {uploadedFile ? (
        <Styled.UploadedValue>
          <div className="name">
            {loading ? (
              <>
                <Loading /> Uploading...
              </>
            ) : (
              uploadedFile?.imageName
            )}
          </div>
          <RefreshIcon className="icon" onClick={handleUpload} />
        </Styled.UploadedValue>
      ) : (
        <Styled.ButtonUpload
          white={!loading}
          onClick={handleUpload}
          isError={error ? true : false}
          text={
            <span>
              {loading ? (
                <>
                  <Loading /> Uploading...
                </>
              ) : (
                <>
                  Upload document <span className="requited">*</span>
                </>
              )}
            </span>
          }
        />
      )}
      {/* {error && !uploadedFile && (
        <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
      )} */}
    </Styled.Wrap>
  );
};

export default UploadButton;
