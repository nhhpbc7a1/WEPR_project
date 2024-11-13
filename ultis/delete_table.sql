USE WEPR_news;

-- Xóa các bảng phụ thuộc trước (các bảng có khóa ngoại tham chiếu tới bảng khác)
DROP TABLE IF EXISTS Article_Views;
DROP TABLE IF EXISTS Article_History;
DROP TABLE IF EXISTS Subscription_extensions;
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Article_Tags;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Images;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Subscribers;
DROP TABLE IF EXISTS Writers;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Roles;
