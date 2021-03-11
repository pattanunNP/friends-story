import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Paper, Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../components/loading.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
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
    width: "280px",
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function Home() {
  const classes = useStyles();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetch() {
    setLoading(true);
    setTimeout(() => {
      axios.post("https://friendsstory.herokuapp.com/api/v1/data").then(
        (response) => {
          const data = response.data.result;
          setInfo(data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 2000);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="App">
      <Box
        display="flex"
        justifyContent="center"
        style={{
          padding: "2rem",
        }}
      >
        <Grid container className={classes.root} spacing={1}>
          {loading ? (
            <div>
              <Box display="flex" justifyContent="center">
                {" "}
                <FadeIn>
                  {" "}
                  <Lottie options={defaultOptions} height={320} width={320} />
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
              {info.length === 0 ? (
                <div>
                  <Box display="flex" justifyContent="center">
                    <h1>ไม่มีข้อมูล</h1>
                  </Box>
                </div>
              ) : (
                <div>
                  {info.map((user) => (
                    <div>
                      {" "}
                      <Grid item xs={6}>
                        <Paper
                          key={user.id}
                          className={classes.paper}
                          style={{
                            borderRadius: "20px",
                            margin: "5px",
                            padding: "1rem",
                          }}
                        >
                          <Avatar
                            src={user.profileImage}
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                          ></Avatar>
                          <Typography>
                            <h1
                              style={{ fontFamily: "Itim", fontSize: "15px" }}
                            >
                              จาก {user.name}
                            </h1>
                            <p style={{ fontFamily: "Itim", fontSize: "15px" }}>
                              " {user.content} "
                            </p>
                          </Typography>
                          <Grid container className={classes.root} spacing={6}>
                            <Grid item xs={6}>
                              <img
                                alt="fb"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                              />
                              <h2
                                style={{
                                  fontFamily: "Itim",
                                  fontSize: "15px",
                                }}
                              >
                                {user.FB}
                              </h2>
                            </Grid>
                            <Grid item xs={6}>
                              <img
                                alt="ig"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                }}
                                src="https://www.manitawedding.com/wp-content/uploads/2018/05/instagram-logo-png-transparent-background-800x799.png"
                              />
                              <h2
                                style={{
                                  fontFamily: "Itim",
                                  fontSize: "15px",
                                }}
                              >
                                {user.IG}
                              </h2>
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
                              <h2
                                style={{
                                  fontFamily: "Itim",
                                  fontSize: "15px",
                                }}
                              >
                                {user.Call}
                              </h2>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
