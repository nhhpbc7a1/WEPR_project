USE WEPR_news;

-- Thêm dữ liệu vào bảng Roles
INSERT INTO Roles (role_name) VALUES 
    ('Admin'),
    ('Editor'),
    ('Writer'),
    ('Subscriber');

-- Thêm dữ liệu vào bảng Accounts
INSERT INTO Accounts (role_id, username, password) VALUES 
    (1, 'admin_user', 'hashed_password_admin'),
    (2, 'editor_user', 'hashed_password_editor'),
    (3, 'writer_user', 'hashed_password_writer'),
    (4, 'subscriber_user', 'hashed_password_subscriber');

-- Thêm dữ liệu vào bảng Users
INSERT INTO Users (account_id, fullname, email, phone_number, birth_date) VALUES 
    (1, 'Admin User', 'admin@example.com', '1234567890', '1980-01-01'),
    (2, 'Editor User', 'editor@example.com', '0987654321', '1990-05-20'),
    (3, 'Writer User', 'writer@example.com', '0912345678', '1985-10-15'),
    (4, 'Subscriber User', 'subscriber@example.com', '0932145678', '2000-07-30');

-- Thêm dữ liệu vào bảng Writers
INSERT INTO Writers (pen_name, user_id) VALUES 
    ('WriterOne', 3);

-- Thêm dữ liệu vào bảng Subscribers
INSERT INTO Subscribers (subscription_expiration, user_id) VALUES 
    ('2025-01-01 00:00:00', 4);

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
    ('Cuộc sống đó đây', 11),

     ('Nông Thôn', NULL),
    ('Nông nghiệp', 16),
    ('Kinh tế nông thôn', 16),
    ('Đời sống làng quê', 16),
    ('Môi trường nông thôn', 16),
    ('Văn hóa làng xã', 16),

    -- Danh mục cha 2: "Thành thị"
    ('Thành thị', NULL),
    ('Hạ tầng đô thị', 22),
    ('Giao thông đô thị', 22),
    ('Nhịp sống thành phố', 22),
    ('Kinh tế đô thị', 22),
    ('Văn hóa đô thị', 22),

    -- Danh mục cha 3: "Bản tin"
    ('Bản tin', NULL),
    ('Tin nóng', 28),
    ('Thời sự trong nước', 28),
    ('Thời sự quốc tế', 28),
    ('Sự kiện nổi bật', 28),
    ('Phân tích chuyên sâu', 28),

    -- Danh mục cha 4: "Khoa học"
    ('Khoa học', NULL),
    ('Công nghệ mới', 34),
    ('Khám phá vũ trụ', 34),
    ('Khoa học đời sống', 34),
    ('Phát minh và sáng chế', 34),
    ('Nghiên cứu môi trường', 34),

    -- Danh mục cha 5: "Giải trí"
    ('Giải trí', NULL),
    ('Âm nhạc', 40),
    ('Phim ảnh', 40),
    ('Sự kiện giải trí', 40),
    ('Trò chơi điện tử', 40),
    ('Nghệ thuật biểu diễn', 40),

    -- Danh mục cha 6: "Thể thao"
    ('Thể thao', NULL),
    ('Bóng đá', 46),
    ('Thể thao điện tử',46),
    ('Bóng chuyền', 46),
    ('Điền kinh', 46),
    ('Thể thao quốc tế', 46),

    -- Danh mục cha 7: "Sức khỏe"
    ('Sức khỏe', NULL),
    ('Dinh dưỡng', 52),
    ('Làm đẹp', 52),
    ('Tập luyện thể dục', 52),
    ('Phòng ngừa bệnh', 52),
    ('Tâm lý và sức khỏe tinh thần', 52);

    
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
    (1, 'The Future of Technology', 1, '2024-10-01 10:00:00', 'A look into upcoming tech trends', 'Detailed content about technology trends.', 'published', TRUE, 1, TRUE),
    (2, 'Science and the Universe', 2, '2024-10-05 11:30:00', 'Exploring space and beyond', 'In-depth content about scientific discoveries in space.', 'reviewed', FALSE, 1, TRUE),
    (3, 'Health Tips for 2024', 3, '2024-09-20 09:00:00', 'Ways to stay healthy', 'Guidance on health and wellness practices.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 1', 4, '2024-10-14 08:15:00', 'Abstract of Travel Article 1', 'Detailed content of Travel Article 1.', 'published', TRUE, 1, TRUE),
    (1, 'Tech Article 2', 1, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 1, FALSE),
    (2, 'Science Article 2', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 1, TRUE),
    (3, 'Health Article 2', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 2', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 1, FALSE),
    (1, 'Tech Article 3', 1, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 1, FALSE),
    (2, 'Science Article 3', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 1, TRUE),
    (3, 'Health Article 3', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 3', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 1, FALSE),
    (1, 'Tech Article 4', 1, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 1, FALSE),
    (2, 'Science Article 4', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 1, TRUE),
    (3, 'Health Article 4', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 4', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 1, FALSE),
    (1, 'Tech Article 5', 1, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 1, FALSE),
    (2, 'Science Article 5', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 1, TRUE),
    (3, 'Health Article 5', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 5', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 1, FALSE),
    (1, 'Tech Article 6', 1, '2024-10-15 10:30:00', 'Abstract of Tech Article 2', 'Detailed content of Tech Article 2.', 'reviewed', FALSE, 1, FALSE),
    (2, 'Science Article 6', 2, '2024-10-16 12:00:00', 'Abstract of Science Article 2', 'Detailed content of Science Article 2.', 'draft', FALSE, 1, TRUE),
    (3, 'Health Article 6', 3, '2024-10-17 11:00:00', 'Abstract of Health Article 2', 'Detailed content of Health Article 2.', 'published', FALSE, 1, TRUE),
    (4, 'Travel Article 6', 4, '2024-10-18 13:00:00', 'Abstract of Travel Article 2', 'Detailed content of Travel Article 2.', 'published', TRUE, 1, FALSE);



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
    (1, '2024-12-01 00:00:00', '2025-12-01 00:00:00');

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
