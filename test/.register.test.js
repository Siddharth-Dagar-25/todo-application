import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserProvider } from "../src/components/UserContext.jsx";

jest.mock("firebase/auth");

describe("Register Component", () => {
  it("renders input fields and submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <UserProvider>
        <Register />
      </UserProvider>
    );

    expect(getByPlaceholderText("Enter your Full Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter your Email Address")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter your Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Confirm your Password")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: "test@example.com", uid: "123", displayName: null }
    });

    const { getByPlaceholderText, getByText } = render(
      <UserProvider>
        <Register />
      </UserProvider>
    );

    fireEvent.change(getByPlaceholderText("Enter your Email Address"), { target: { value: "test@example.com" } });
    fireEvent.change(getByPlaceholderText("Enter your Password"), { target: { value: "password" } });
    fireEvent.change(getByPlaceholderText("Confirm your Password"), { target: { value: "password" } });

    fireEvent.click(getByText("Sign Up"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), 
        "test@example.com",
        "password"
      );
    });
  });
});
