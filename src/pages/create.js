import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Input,
  Avatar,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../components/loading.json";
import * as success from "../components/success.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "auto",
    width: "360px",
    padding: "5px",
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function Create() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    content: "",
    FB: "",
    IG: "",
    Call: "",
    profileImage: {},
  });

  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
  async function uploadImage(e) {
    const file = e.target.files[0];
    const base64 = await onSetProfile(file);
    //console.log(base64);
    setData({ ...data, profileImage: { id: generateUUID(), img: base64 } });
  }
  function onSetProfile(file) {
    return new Promise((resolve, reject) => {
      let file_reader = new FileReader();
      file_reader.readAsDataURL(file);
      file_reader.onload = () => {
        resolve(file_reader.result);
      };
      file_reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    setTimeout(() => {
      axios.post("https://friendsstory.herokuapp.com/api/v1/create", data).then(
        (response) => {
          console.log(response.data);
          setLoading(false);
          setSuccess(true);
          history.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
    }, 7000);
  }
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        justifyContent="center"
        style={{
          padding: "1rem",
        }}
      >
        {success ? (
          <div>
            <FadeIn>
              <Lottie options={defaultOptions2} height={320} width={320} />
            </FadeIn>
          </div>
        ) : (
          <div>
            <Grid container className={classes.root} spacing={1}>
              {loading ? (
                <div>
                  <Box display="flex" justifyContent="center">
                    {" "}
                    <FadeIn>
                      {" "}
                      <Lottie
                        options={defaultOptions}
                        height={320}
                        width={320}
                      />
                    </FadeIn>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <h1 style={{ fontFamily: "Itim", fontSize: "15px" }}>
                      กำลังโหลดจ้า ...{" "}
                    </h1>
                  </Box>
                </div>
              ) : (
                <div>
                  <Paper
                    className={classes.paper}
                    style={{
                      borderRadius: "20px",
                      margin: "5px",
                      padding: "1rem",
                    }}
                  >
                    {" "}
                    <Box display="flex" justifyContent="center">
                      <Input
                        style={{ display: "none" }}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                        }}
                      />
                      <label
                        htmlFor="icon-button-file"
                        style={{ marginTop: "60px" }}
                      >
                        <Box display="flex" justifyContent="center">
                          <Avatar
                            src={data.profileImage.img}
                            style={{
                              width: "100px",
                              height: "100px",
                            }}
                          />
                        </Box>
                        <Box display="flex" justifyContent="center">
                          <h1
                            style={{
                              fontFamily: "Itim",
                              fontSize: "15px",
                              color: "rgba(254,87,98,1)",
                            }}
                          >
                            กดเพื่อเลือกรูปโปรโฟล์
                          </h1>
                        </Box>
                      </label>
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography>
                        <h1 style={{ fontFamily: "Itim", fontSize: "25px" }}>
                          จาก {data.name}
                        </h1>
                        <Input
                          id="name"
                          name="name"
                          value={data["name"]}
                          placeholder="ชื่อ :"
                          style={{ fontFamily: "Itim", fontSize: "25px" }}
                          onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                          }}
                        />
                      </Typography>
                    </Box>
                    <Box>
                      <Box display="flex" justifyContent="center">
                        <TextareaAutosize
                          style={{
                            marginTop: "25px",
                            width: "320px",
                            height: "100px",
                            fontFamily: "Itim",
                            borderRadius: "10px",
                            fontSize: "15px",
                            color: "rgba(254,87,98,1)",
                          }}
                          aria-label="minimum height"
                          rowsMin={3}
                          rowsMax={20}
                          placeholder="เขียนให้หน่อยสิ"
                          onChange={(e) => {
                            setData({ ...data, content: e.target.value });
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      style={{
                        marginTop: "25px",
                        fontFamily: "Itim",
                      }}
                    >
                      <Grid container className={classes.root} spacing={1}>
                        <Grid item xs={6}>
                          <img
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                          />
                          <Input
                            placeholder="Facebook :"
                            onChange={(e) => {
                              setData({ ...data, FB: e.target.value });
                            }}
                            style={{
                              marginLeft: "5px",
                              fontFamily: "Itim",
                              fontSize: "15px",
                              color: "rgba(7,20,199,1) ",
                            }}
                          ></Input>
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            src="https://www.manitawedding.com/wp-content/uploads/2018/05/instagram-logo-png-transparent-background-800x799.png"
                          />
                          <Input
                            placeholder="IG :"
                            onChange={(e) => {
                              setData({ ...data, IG: e.target.value });
                            }}
                            style={{
                              marginLeft: "5px",
                              fontFamily: "Itim",
                              fontSize: "15px",
                              color: "rgba(254,87,98,1)",
                            }}
                          ></Input>
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                            src="https://res.cloudinary.com/hgy47tmtk/image/upload/v1615369490/phone-call_yx26iy.svg"
                          />
                          <Input
                            value={data.Call}
                            onChange={(e) => {
                              setData({ ...data, Call: e.target.value });
                            }}
                            placeholder="Call :"
                            type="number"
                            style={{
                              marginLeft: "5px",
                              fontFamily: "Itim",
                              fontSize: "15px",
                              color: "rgba(20,100,20,1)",
                            }}
                          ></Input>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button
                      onClick={handleSubmit}
                      style={{
                        marginTop: "70px",
                        color: "#ffff",
                        borderRadius: "20px",
                        fontFamily: "Itim",
                        fontSize: "25px",
                        width: "320px",
                        backgroundImage:
                          "linear-gradient( 109.6deg,  rgba(254,87,98,1) 11.2%, rgba(255,107,161,1) 99.1% )",
                      }}
                    >
                      ส่ง
                    </Button>
                    <p
                      style={{
                        marginTop: "10px",
                        color: "rgba(254,87,98,1)",

                        fontFamily: "Itim",
                        fontSize: "12px",
                      }}
                    >
                      กดแล้วรอหน่อยนะ
                    </p>
                  </Paper>
                </div>
              )}
            </Grid>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default Create;
