"use client";

import { postMethod } from "@/app/helpers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "@/app/store/slice/registerSlice";

const FormFields = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // The Record<string, (value: string) => void> type ensures:
    // The keys are strings (like "userName", "email", and "password").
    // The values are functions that expect a string input (the new value for the state).
    // the void type is used to indicate that a function does not return any value

    type stateUpdates = Record<string, (value: string) => void>;

    const stateUpdate: stateUpdates = {
      userName: setUserName,
      email: setEmail,
      password: setPassword,
    };
    stateUpdate[name](value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerStart());
    const data = {
      userName,
      email,
      password,
    };

    interface ErrorResponse {
      error: string; // Matches the `error` key in your Next.js response
    }

    try {
      const serverData = await postMethod<{ message: string }>(
        "/api/auth/register/",
        data
      );
      if (serverData.status === 201) {
        dispatch(registerSuccess());
      } else if (serverData.status === 400) {
        const errorMessage = (serverData.data as ErrorResponse).error;
        dispatch(registerFailure({ error: errorMessage }));
      } else {
        dispatch(registerFailure({ error: "Unexpected error message" }));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      dispatch(registerFailure({ error: "An unexpected error occurred" }));
    }
  };
  console.log(loading, error, success);

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          name="userName"
          value={userName}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default FormFields;
