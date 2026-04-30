const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json())

app.post("/api", (req, res) => {
    const { method, params, id } = req.body;
    const result = methods[`${method}`](params[0]);
    res.status(200).json({
        jsonrpc: "2.0",
        result,
        id
    })
});

app.listen(PORT, () => {
    console.log(`API IS UP AND RUNNING IN PORT: ${PORT}`);
})

const methods = {
    sayHello: (name) => {
        return { greet: `Hello ${name}` }
    }
}

