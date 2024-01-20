// Landing.js

import { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import "./Landing.css";
import { useSelector } from "react-redux";
import { register, loginUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../features/layout/layoutSlice";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSignup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.users);

  useEffect(() => {
    if (message === "User registered successfully") {
      setSignup(false);
      dispatch(showSuccessNotification("Success!", "User registered"));
    }
    if (message === "User logged in") {
      setModalVisible(false);
      dispatch(showSuccessNotification("Success!", "User logged in"));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      localStorage.setItem("User", JSON.stringify({ user }));
    }
    if (message === "Invalid credentials") {
      dispatch(showErrorNotification("Error!", "Invalid credentials"));
    }
    if (message === "User not found") {
      dispatch(showErrorNotification("Error!", "User not found"));
    }
    if (message === "User already exists") {
      dispatch(showErrorNotification("Error!", "User already exists"));
    }
  }, [message]);

  const showModal = () => {
    setSignup(false); // Al abrir el modal, establecemos la vista en iniciar sesión
    setModalVisible(true);
  };

  const handleToggleView = () => {
    setSignup(!isSignup); // Cambiamos entre crear cuenta e iniciar sesión
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    if (isSignup) {
      dispatch(register(values));
    } else {
      dispatch(loginUser(values));
    }
  };

  return (
    <div className="landing-container">
      {/* Fondo del componente */}
      <div className="background-image"></div>

      {/* Contenido central */}
      <div className="content">
        ``
        <h1>Welcome to Your Notebook</h1>
        <Button type="primary" onClick={showModal}>
          Open Your Notebook
        </Button>
      </div>

      {/* Modal para iniciar sesión o crear cuenta */}
      <Modal
        title={isSignup ? "Create an Account" : "Login"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {isSignup && (
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {isSignup && (
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isSignup ? "Create Account" : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div>
          {isSignup ? "Already have an account?" : "Don't have an account yet?"}
          <Button type="link" onClick={handleToggleView}>
            {isSignup ? "Login here" : "Create an account"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Landing;
