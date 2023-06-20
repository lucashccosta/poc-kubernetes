import express from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 9080;

app.get("/api/v1/health", (req, res) => {
    res.json({
        srv: "k8s-api",
        status: "OK",
        httpStatus: 200
    });
});

app.listen(PORT, () => {
    console.info(`Server started succesfully at port ${PORT}`);
});
