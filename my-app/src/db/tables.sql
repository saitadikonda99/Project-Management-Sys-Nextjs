-- Create a database sdp
CREATE DATABASE IF NOT EXISTS sdp;

-- use sdp database 
USE sdp;

-- Create table users
CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'Student',
    refresh_token VARCHAR(255) DEFAULT NULL,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create a table named user_details
CREATE TABLE IF NOT EXISTS user_details (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    branch VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    residence VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

