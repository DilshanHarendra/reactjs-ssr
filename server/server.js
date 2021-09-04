const express = require('express')
const app = express()
const fs = require("fs");
const  path= require("path");

const React = require("react");
const ReactDOMServer = require('react-dom/server');

const  App =require("../src/App");


app.use("^/$", (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToNodeStream(<App />)}</div>`
            )
        );
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')))



app.listen(8000,()=>console.log("Local:            http://localhost:8000\n "))
