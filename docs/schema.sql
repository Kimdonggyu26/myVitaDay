CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    birth_year INT,
    gender VARCHAR(20),
    health_goal VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supplement_products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    form VARCHAR(100),
    serving_per_day INT,
    caution_text TEXT
);

CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    unit VARCHAR(50),
    category VARCHAR(100)
);

CREATE TABLE supplement_ingredients (
    id BIGSERIAL PRIMARY KEY,
    supplement_product_id BIGINT NOT NULL REFERENCES supplement_products(id) ON DELETE CASCADE,
    ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2),
    UNIQUE (supplement_product_id, ingredient_id)
);

CREATE TABLE user_supplements (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    supplement_product_id BIGINT REFERENCES supplement_products(id) ON DELETE SET NULL,
    custom_name VARCHAR(255),
    intake_count_per_day INT NOT NULL DEFAULT 1,
    memo TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE routine_slots (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slot_code VARCHAR(50) NOT NULL,
    notify_time TIME,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (user_id, slot_code)
);

CREATE TABLE routine_items (
    id BIGSERIAL PRIMARY KEY,
    routine_slot_id BIGINT NOT NULL REFERENCES routine_slots(id) ON DELETE CASCADE,
    user_supplement_id BIGINT NOT NULL REFERENCES user_supplements(id) ON DELETE CASCADE,
    UNIQUE (routine_slot_id, user_supplement_id)
);

CREATE TABLE intake_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_supplement_id BIGINT NOT NULL REFERENCES user_supplements(id) ON DELETE CASCADE,
    routine_slot_id BIGINT REFERENCES routine_slots(id) ON DELETE SET NULL,
    intake_date DATE NOT NULL,
    taken BOOLEAN NOT NULL DEFAULT FALSE,
    taken_at TIMESTAMP,
    UNIQUE (user_supplement_id, intake_date, routine_slot_id)
);
