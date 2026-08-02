-- Schema for the todo app. Applied manually with psql rather
-- than auto-mounted, so it can be re-run without wiping data.


CREATE TABLE IF NOT EXISTS todos (
    id         SERIAL      PRIMARY KEY,
    title      TEXT        NOT NULL CHECK (length(trim(title)) > 0),
    done       BOOLEAN     NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- The Ui lists newest first , so index that exact path .

CREATE INDEX IF NOT EXISTS todos_created_at_idx ON todos (created_at DESC);

