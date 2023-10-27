"use client";
import React, { useState, useRef } from "react";
// import InputBox from "./InputBox";
// import { Button } from "./Button";

import { Button } from "../../components/Button";
// import Input from "./inputs/Input";
// import { Input } from "./ui/input";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

// type Props = {
//   className?: string,
//   callbackUrl?: string,
//   error?: string,
// };

// type valuesProps = {
//   username?: string,
//   firstName?: string,
//   lastName?: string,
//   password?: string,
// };

const Login = (Props) => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  //   const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const onLogin = async (valuesProps) => {
    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      //authentication successful
      if (!res?.error) {
        //check if user is registered
        // const payload = `{"username": "${values.username}"`;
        const resp = await fetch(
          `http://localhost:3003/user/${values.username}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // body: payload,
            mode: "cors",
          }
        );
        if (resp.status === 200) {
          //   router.push(props.callbackUrl ?? "http://localhost:3000");
        } else {
          alert("user is not registered.");
        }
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onRegister = async (values, onSubmitProps) => {
    let payload = `{"UserName": "${values.username}", "Password": "${values.password}"}`;
    const resp = await fetch("http://localhost:5239/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      mode: "cors",
    });

    if (resp.status === 200) {
      alert("user authenticated");

      payload = `{"firstName": "${values.firstName}", "lastName": "${values.lastName}", "username": "${values.username}"}`;

      const res = await fetch("http://localhost:3003/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        mode: "cors",
      });
      if (res.status === 201) {
        alert("user registered");
        onSubmitProps.resetForm();
        setPageType("login");
      } else {
        alert("we have encoutered an error pls retry.");
      }
    } else {
      alert("we cannot find this user");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await onLogin(values);
    else await onRegister(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800">
            <div className="grid h-screen place-items-center">
              <div className="flex flex-col w-1/3 h-1/2 bg-slate-300 pt-10 p-6 gap-3 rounded-2xl">
                {/* {!!props.error && (
                  <p className="bg-red-100 text-red-600 text-center p-2">
                    Authentication Failed
                  </p>
                )} */}
                {isRegister && (
                  <>
                    <TextField
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <div className="flex flex-col items-center justify-center mt-2 gap-2 ">
                  <Button type="submit" className="w-full bg-primary-500">
                    {isLogin ? "Login" : "Register"}
                  </Button>
                  <p>
                    {isLogin ? "First time here?" : "Already have an account?"}
                    &nbsp;
                    <span
                      onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                        resetForm();
                      }}
                      className="
            text-primary-500
            cursor-pointer
            hover:underline
            font-semibold
          "
                    >
                      {isLogin ? "Create an account" : "Login"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
