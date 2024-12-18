USE WEPR_news;

-- Thêm dữ liệu vào bảng Roles
INSERT INTO Roles (role_name) VALUES 
    ('Admin'),
    ('Editor'),
    ('Writer'),
    ('Subscriber');

-- Thêm dữ liệu vào bảng Users
-- Insert dữ liệu vào bảng Users
INSERT INTO Users ( username, password, fullname, email, phone_number, birth_date, role_id, subscription_expiration, pen_name)
VALUES 
    -- Admin
    ('admin_user', 'hashed_password_admin', 'Admin User', 'admin@example.com', '1234567890', '1980-01-01', 1, NULL, "RootWriter"),

    -- Editor
    ('editor_user', 'hashed_password_editor', 'Editor User', 'editor@example.com', '0987654321', '1990-02-01', 2, NULL, NULL),

    -- Writer
    ( 'writer_user', 'hashed_password_writer', 'Writer User', 'writer@example.com', '1122334455', '1995-03-01', 3, NULL, 'Writer Pen Name'),

    -- Subscriber
    ('subscriber_user', 'hashed_password_subscriber','Subscriber User', 'subscriber@example.com', '5566778899', '2000-04-01', 4, '2025-12-31 23:59:59', NULL);

-- Thêm dữ liệu vào bảng Categories
INSERT INTO Categories (category_name, parent_category_id)
VALUES 
    -- Danh mục cha 1: "Thời sự"
    ('Thời sự', NULL),
    ('Chính trị', 1),
    ('Dân sinh', 1),
    ('Lao động - Việc làm', 1),
    ('Giao thông', 1),

    -- Danh mục cha 2: "Góc nhìn"
    ('Góc nhìn', NULL),
    ('Bình luận nhiều', 6),
    ('Chính trị & chính sách', 6),
    ('Y tế & sức khỏe', 6),
    ('Kinh doanh & quản trị', 6),

    -- Danh mục cha 3: "Thế giới"
    ('Thế giới', NULL),
    ('Tư liệu', 11),
    ('Phân tích', 11),
    ('Người Việt 5 châu', 11),
    ('Cuộc sống đó đây', 11);
    
-- Thêm dữ liệu vào bảng Tags
INSERT INTO Tags (tag_name) VALUES 
    ('Innovation'),
    ('Research'),
    ('Wellness'),
    ('Adventure');

-- Thêm dữ liệu vào bảng Images
INSERT INTO Images (image_href) VALUES 
    ('/images/tech.jpg'),
    ('/images/science.jpg'),
    ('/images/health.jpg'),
    ('/images/travel.jpg');

-- Thêm dữ liệu vào bảng Articles
INSERT INTO Articles (image_id, title, category_id, published_date, abstract, content, status, is_premium, writer_id, is_featured) VALUES 
    (1, 'The Future of Technology', 2, '2024-10-01 10:00:00', 'A look into upcoming tech trends', 'Detailed content about technology trends.', 'published', TRUE, 3, TRUE),
    (2, 'Science and the Universe', 2, '2024-10-05 11:30:00', 'Exploring space and beyond', 'In-depth content about scientific discoveries in space.', 'reviewed', FALSE, 3, TRUE),
    (3, 'Health Tips for 2024', 3, '2024-09-20 09:00:00', 'Ways to stay healthy', 'Guidance on health and wellness practices.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 1', 4, '2024-10-14 08:15:00', 'Abstract of Travel Article 1', 'Detailed content of Travel Article 1.', 'published', TRUE, 3, TRUE),
    (1, 'Tech Article 2', 2, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 3, FALSE),
    (2, 'Science Article 2', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 3, TRUE),
    (3, 'Health Article 2', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 2', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 3, FALSE),
    (1, 'Tech Article 3', 2, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 3, FALSE),
    (2, 'Science Article 3', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 3, TRUE),
    (3, 'Health Article 3', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 3', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 3, FALSE),
    (1, 'Tech Article 4', 2, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 3, FALSE),
    (2, 'Science Article 4', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 3, TRUE),
    (3, 'Health Article 4', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 4', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 3, FALSE),
    (1, 'Tech Article 5', 2, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 3, FALSE),
    (2, 'Science Article 5', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 3, TRUE),
    (3, 'Health Article 5', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 5', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 3, FALSE),
    (1, 'Tech Article 6', 2, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 3, FALSE),
    (2, 'Science Article 6', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 3, TRUE),
    (3, 'Health Article 6', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 3, TRUE),
    (4, 'Travel Article 6', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 3, FALSE);



-- Thêm dữ liệu vào bảng Article_Tags
INSERT INTO Article_Tags (tag_id, article_id) VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

-- Thêm dữ liệu vào bảng Comments
INSERT INTO Comments (article_id, commented_date, commenter_name, content) VALUES 
    (1, '2024-10-02 14:00:00', 'John Doe', 'Great article on technology!'),
    (2, '2024-10-06 15:30:00', 'Jane Smith', 'Amazing insights on space science.'),
    (3, '2024-09-21 16:45:00', 'Emily White', 'Thanks for the health tips!');

-- Thêm dữ liệu vào bảng Assignments
INSERT INTO Assignments (editor_id, category_id) VALUES 
    (2, 1),
    (2, 2);

-- Thêm dữ liệu vào bảng Subscription_extensions
INSERT INTO Subscription_extensions (subscriber_id, extended_at, new_expiration_date) VALUES 
    (4, '2024-12-01 00:00:00', '2025-12-01 00:00:00');

-- Thêm dữ liệu vào bảng Article_History
INSERT INTO Article_History (reason, status, article_id, updated_at) VALUES 
    ('Initial draft', 'draft', 1, '2024-09-15 08:00:00'),
    ('Reviewed by editor', 'reviewed', 1, '2024-09-18 10:00:00'),
    ('Published after review', 'published', 1, '2024-10-01 10:00:00');

-- Thêm dữ liệu vào bảng Article_Views
INSERT INTO Article_Views (user_id, article_id, viewed_at) VALUES 
    (4, 1, '2024-10-02 12:30:00'),
    (4, 2, '2024-10-06 14:00:00'),
    (4, 3, '2024-09-21 10:00:00');
