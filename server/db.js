import "dotenv/config" ;
import pg from "pg" ;


const {Pool} = pg 


export const pool = new Pool({
    host:process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    max: 10,
    idleTimeoutMillis: 30000,
})

// Crash loudly rather than limp along with a dead pool.
pool.on("error", (err) => {
  console.error("Unexpected postgres error", err);
  process.exit(1);
});