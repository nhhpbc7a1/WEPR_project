
CREATE DATABASE WEPR_news;

USE WEPR_news;
-- Bảng Roles
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL
);

-- Bảng Accounts
CREATE TABLE Accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Bảng Users
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    fullname VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id)
);

-- Bảng Writers
CREATE TABLE Writers (
    writer_id INT PRIMARY KEY AUTO_INCREMENT,
    pen_name VARCHAR(50),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Bảng Subscribers
CREATE TABLE Subscribers (
    subscriber_id INT PRIMARY KEY AUTO_INCREMENT,
    subscription_expiration TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Bảng Categories
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

-- Bảng Tags
CREATE TABLE Tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(50) NOT NULL
);

-- Bảng Images
CREATE TABLE Images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    image_href VARCHAR(255) NOT NULL
);

-- Bảng Articles
CREATE TABLE Articles (
    article_id INT PRIMARY KEY AUTO_INCREMENT,
    image_id INT,
    title VARCHAR(255) NOT NULL,
    category_id INT,
    published_date TIMESTAMP,
    abstract TEXT,
    content TEXT,
    status ENUM('draft', 'reviewed', 'published', 'rejected') NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    writer_id INT,
    FOREIGN KEY (image_id) REFERENCES Images(image_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (writer_id) REFERENCES Writers(writer_id)
);
-- Bảng Tag_lists
CREATE TABLE Article_Tags (
    tag_id INT,
    article_id INT,
    PRIMARY KEY (tag_id, article_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);

-- Bảng Comments
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT,
    commented_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commenter_name VARCHAR(100),
    content TEXT,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);

-- Bảng Assignments
CREATE TABLE Assignments (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    editor_id INT,
    category_id INT,
    FOREIGN KEY (editor_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Bảng Subscription_extensions
CREATE TABLE Subscription_extensions (
    extension_id INT PRIMARY KEY AUTO_INCREMENT,
    subscriber_id INT,
    extended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    new_expiration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscriber_id) REFERENCES Subscribers(subscriber_id)
);

-- Bảng Article_History
CREATE TABLE Article_History (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    reason TEXT,
    status ENUM('draft', 'reviewed', 'published', 'rejected') NOT NULL,
    article_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);

-- Bảng Article_Views
CREATE TABLE Article_Views (
    view_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    article_id INT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (article_id) REFERENCES Articles(article_id)
);
