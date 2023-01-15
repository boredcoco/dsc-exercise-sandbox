import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth } from "/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuthStore from "../lib/store/authStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

function signInPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => directToDashboard())
      .catch((err) => {
        alert(err.message);
      });
    return <div>Loading...</div>;
  };

  const directToDashboard = () => {
    router.push("/dashboard");
    return <div>Loading... </div>;
  };

  const directToSignUpPage = () => {
    router.push("/signUpPage");
    return <div>Loading... </div>;
  };

  return (
    <div>
      <div className="" align="center">
        <h1 align="center">Welcome!</h1>
        <br />

        <Box
          align="center"
          sx={{
            width: 300,
            height: 300,
            align: "right",
            backgroundColor: "#eeeee4",
            p: 2,
            borderRadius: "16px",
          }}
        >
          <TextField
            id="filled-basic"
            variant="filled"
            borderColor="red"
            label="Email"
            name="email"
            type="email"
            onChange={(event) => handleInputs(event)}
          />
          <br />
          <br />
          <TextField
            id="filled-basic"
            variant="filled"
            label="Password"
            name="password"
            type="password"
            onChange={(event) => handleInputs(event)}
          />

          <br />
          <br />
          <Button variant="outlined" onClick={handleSubmit}>
            Sign in
          </Button>
          <br />
          <br />
          <Link component="button" variant="body2" onClick={directToSignUpPage}>
            Don't have an account? Sign up here
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default signInPage;
