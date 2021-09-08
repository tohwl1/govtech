CREATE TABLE govtech;

CREATE TABLE csvs(
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    salary float8 NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE(user_id,user_name)
);
