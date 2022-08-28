import React, { useState, useEffect } from "react";
import { Upload, Form, message, Space } from "antd";
import { CameraFilled } from "@ant-design/icons";

import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";

const FileUpload = ({
  label,
  name,
  setImageId,
  oldFile,
  required,
  setFileUploading,
  unLimited,
}) => {
  const auth = new API.Auth();

  const owner = JSON.parse(localStorage.getItem("fado-admin-panel-user-data"));

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (oldFile) {
      if (Array.isArray(oldFile)) {
        setFileList(
          oldFile.map((o) => ({
            uid: "1",
            name: "banner.png",
            status: "done",
            url: o?.image_url,
          }))
        );
      } else {
        setFileList([
          {
            uid: "1",
            name: "banner.png",
            status: "done",
            url: oldFile,
          },
        ]);
      }
    }
  }, [oldFile]);

  const uploadFile = (file) => {
    var data = new FormData();

    setFileUploading(true);

    message.loading({
      content: "Uploading File...",
      duration: 0,
      key: "loader",
    });

    const fileChanged = oldFile?.logo_url !== file;

    fileChanged && file && data.append("file", file);
    data.append("user", owner?.id);

    fileChanged &&
      getDataManager(auth?.uploadFile, null, data).then((x) => {
        if (x?.status) {
          setImageId(x?.data?.id);
          message.success({
            content: "File uploaded added successfully",
            duration: 0.5,
            key: "loader",
          });
          setFileUploading(false);
        } else {
          const error = getErrorMessage(x?.errors) || x?.message;
          message.error({
            content: error || "Error ocurred",
            duration: 0.5,
            key: "loader",
          });
          setFileUploading(false);
        }
      });
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: "Please select image" }]}
    >
      <Upload
        multiple={false}
        listType="picture-card"
        accept="image/*"
        action={uploadFile}
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        showUploadList={{
          showPreviewIcon: false,
          showDownloadIcon: false,
        }}
      >
        {unLimited ? (
          <Space>
            <CameraFilled /> Upload
          </Space>
        ) : (
          fileList.length < 1 && (
            <Space>
              <CameraFilled /> Upload
            </Space>
          )
        )}
      </Upload>
    </Form.Item>
  );
};

export default FileUpload;
