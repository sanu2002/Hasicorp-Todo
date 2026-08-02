import express from "express" ;

import { todosRouter } from "./routes/todos.js";


const app = express();

const PORT = process.env.PORT || 3000 

app.use(express.json())


app.use("/api/todos",todosRouter);

// Logs every request so you can see the client talking.
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})


// Anything not matched above.

// Health check .Docker and deploy tools poll this to know 
// the server is active . It must NEVER touch the database or Vault - a helath check that depends on them will lie to you during outage 

app.get("/api/health", (req,res)=>{
    res.json({ status: "ok", uptime: process.uptime() });
})

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Error handler. FOUR arguments is how Express recognises one.
// Never send err.stack to a client - it leaks your file paths.
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message =
    status === 400 ? "Invalid request body" : "Internal server error";
  res.status(status).json({ error: message });
});

app.listen(PORT, ()=> {
    console.log(`API listening on http://localhost:${PORT}`)
})