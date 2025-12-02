CREATE TABLE IF NOT EXISTS builds (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    motherboard TEXT NOT NULL,
    cpu TEXT NOT NULL,
    ram TEXT NOT NULL,
    gpu TEXT NOT NULL,
    storage TEXT NOT NULL,
    psu TEXT NOT NULL,
    cooling TEXT NOT NULL,
    case_name TEXT NOT NULL,
    total_price INTEGER NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
