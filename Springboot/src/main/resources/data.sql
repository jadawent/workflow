INSERT IGNORE INTO roles (id, role_name)
VALUES (1, "Manager"), (2, "Employee");

INSERT IGNORE INTO users (id, first_name, last_name, username, password)
VALUES (1, "ADMIN", "ADMIN", "ADMIN", "$2a$10$CYQU6LSOX3XsCDpbmZM5YOxWc4SaSE9XEMehl0fCwdhCeBfoXjT6C");

INSERT INTO user_roles (role_id, user_id)
SELECT
    (SELECT id FROM roles WHERE role_name = "Manager"),
    (SELECT id FROM users WHERE username ="ADMIN")
WHERE NOT EXISTS (
    SELECT 1
    FROM user_roles
    WHERE role_id = (SELECT id FROM roles WHERE role_name = "Manager")
    AND user_id = (SELECT id FROM users WHERE username ="ADMIN")
);

INSERT IGNORE INTO shift_notes (id, title, body, creator_id)
VALUES (1, "default test shift note", "this is a default test shift note created on launch.", 1);




