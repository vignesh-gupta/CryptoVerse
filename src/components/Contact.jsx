import { Button, Col, Row, Typography } from "antd";
import { Input } from "antd";

import React from "react";
import { supabase } from "../supabase-client";

const Contact = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await supabase.from("contacts").insert(form).select();

    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Typography.Title level={2} className="heading">
        Contact Us
      </Typography.Title>
      <Row justify="center" gutter={[30, 30]}>
        <Col span={16} md={8}>
          <Input
            placeholder="Name"
            size="large"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Col>
        <Col span={16} md={8}>
          <Input
            placeholder="Email"
            type="email"
            size="large"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Col>
        <Col span={16} md={16}>
          <Input.TextArea
            placeholder="Message"
            size="large"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={10}
          />
        </Col>

        <Col span={16} md={16}>
          <Button type="primary" size="large" onClick={handleSubmit}>
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
