/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Form,
  message,
  Button,
  Input,
  Select,

} from "antd";

import { useParams, useNavigate } from "react-router-dom";

import TajiraCard from "../../common/tajira-card";
import Spinner from "../../common/spinner";


import API from "../../../utils/api";
import {
  getDataManager,
  getErrorMessage,
} from "../../../utils/helper.functions";
import TextArea from "antd/lib/input/TextArea";



const AddSpeciality = () => {
  const [form] = Form.useForm();

  const speciality = new API.SpecialitySection();


  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isEdit = 1;

  const [loading, setLoading] = useState(false);



  const editSepcialitySection = (payload) => {
    getDataManager(speciality?.editSepcialitySection, setLoading, payload, id).then((x) => {
      if (x?.status) {
        message.success({
          content: "Information saved",
          duration: 3,
        });
        navigate("/speciality-section");
      } else {
        const error = getErrorMessage(x?.errors) || x?.message;
        message.error({
          content: error || "Error ocurred",
          duration: 3,
        });
      }
    });
  };

  const onFinish = (values) => {


    if (isEdit) {
        editSepcialitySection(values);
    } else {
      // addBlog(payload);

    }
  };



  return (
    <TajiraCard heading={isEdit ? "Edit Specialty Section" : "Add Specialty Section"}>
      {loading && <Spinner />}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        scrollToFirstError
      >
        <Form.Item
          label="Specialty Title"
          name="speciality_title"
          rules={[
            {
              required: true,
              message: "Please enter telegram token",
            },
          ]}
        >
        <Input placeholder="Enter Telegram Token" />
        </Form.Item>
        <Form.Item
          label="Specialty Description"
          name="speciality_description"
          rules={[
            {
              required: true,
              message: "Please enter telegram URL",
            },
          ]}
        >
            <TextArea placeholder="Enter Description"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </TajiraCard>
  );
};

export default AddSpeciality;
