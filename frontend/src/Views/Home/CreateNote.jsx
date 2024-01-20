// CreateNote.jsx
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createNote, clearNoteMessage } from "../../features/note/noteSlice";

const CreateNote = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.notes.isLoading);

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.users.user);
  const onFinish = (values) => {
    setIsSubmitting(true);
    values.userId = user.userId;
    dispatch(createNote(values))
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success("Note created successfully");
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    window.location.reload();
  };

  const clearMessage = () => {
    dispatch(clearNoteMessage());
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={clearMessage}
      className="textarea"
    >
      <Form.Item
        name="title"
        label="TITTLE"
        rules={[
          { required: true, message: "Please enter the title of your note" },
        ]}
        labelCol={{ span: 1 }}
      >
        <Input
          style={{
            background: "transparent",
            border: "none",
            marginBottom: "2vh",
            marginLeft: "1vw",
          }}
        />
      </Form.Item>
      <Form.Item
        style={{ minHeight: "55vh" }}
        name="content"
        label="CONTENT:"
        rules={[
          { required: true, message: "Please enter the content of your note" },
        ]}
        // labelCol={{ span: 1 }}
      >
        <Input.TextArea
          style={{
            minHeight: "55vh",

            background: "transparent",
            border: "none",
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading || isSubmitting}
        >
          Create Note
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNote;
