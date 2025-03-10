import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message, Upload, } from "antd";

import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // const handleImageChange = ({ file }) => {
  //   setProductData((prevData) => ({ ...prevData, image: file.originFileObj }));
  //   form.setFieldsValue({ image: file.name }); // Sync with Ant Design
  // };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle price change (since InputNumber uses a different event)
  const handlePriceChange = (value) => {
    setProductData((prevData) => ({ ...prevData, price: value }));
  };

  // Form submit handler
  const onFinish = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        messageApi.open({
          type: "success",
          content: "Product created successfully!",
        });

        setProductData({
          name: "",
          description: "",
          price: "",
        });

        form.resetFields();
      } else {
        messageApi.open({
          type: "error",
          content: data.message || "Failed to create product",
        });
      }
    } catch (err) {
      console.log("Error creating product:", err);
      messageApi.open({
        type: "error",
        content: "Error creating product",
      });
    }
  };

  // Form Submit Error Handler
  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
    messageApi.open({
      type: "error",
      content: "Please fill in all required fields correctly.",
    });
  };

  return (
    <>
      <div className="text-md font-bold ">
        <Link className="flex gap-1" to="/">
          {<ArrowLeftOutlined />}
          <h1>Go Back</h1>
        </Link>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg w-[80%] mx-auto">
        <h2 className="text-2xl font-bold mb-6">Create Product</h2>
        {contextHolder}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            price: 0,
          }}
        >
          {/* Product Name */}
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Input
              type="text"
              name="name"
              value={productData.name}
              placeholder="Enter product name"
              onChange={handleInputChange}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the product description" }]}
          >
            <Input.TextArea
              name="description"
              value={productData.description}
              rows={4}
              placeholder="Enter product description"
              onChange={handleInputChange}
            />
          </Form.Item>



          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the product price" }]}
          >
            <InputNumber
              name="price"
              value={productData.price}
              className="w-full"
              min={0}
              max={10000}
              placeholder="Enter product price"
              onChange={handlePriceChange}
            />
          </Form.Item>

          {/* Image Upload */}
          {/* <Form.Item
            label="Product Image"
            name="image"
            rules={[{ message: "Please upload a product image" }]}
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleImageChange}
              maxCount={1}
              listType="picture"
              required
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};


export default CreateProduct;
