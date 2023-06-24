import express from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 9080;
const VERSION = env.VERSION || "v0.0.0";
const API_TOKEN = env.API_TOKEN || "none";

app.get("/api/v1/health", (req, res) => {
    res.json({
        svc: "k8s-api",
        status: "OK",
        httpStatus: 200,
        version: VERSION,
        token: API_TOKEN
    });
});

app.listen(PORT, () => {
    console.info(`Server started succesfully at port ${PORT}`);
});
