import express from "express" ;



const app = express();

const PORT = process.env.PORT || 3000 

app.use(express.json())


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

    app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
    });
})




app.listen(PORT, ()=> {
    console.log(`API listening on http://localhost:${PORT}`)
})