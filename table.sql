create table users (
    user_Id varchar(45),
    username varchar(45),
    email varchar(45),
    password varchar(45),
    isAdmin varchar(45)
);

insert into users(user_Id,username,email,password,isAdmin) values('lsrpqv6327','testuser1','testuser@gmail.com','test','false');


-- search by catId
SELECT product_ID, product_Name,product_Description,brand,original_Price, discount_Price, categoryId
FROM `e-shopping`.products JOIN `e-shopping`.categories ON `e-shopping`.products.categoryId = `e-shopping`.categories.id WHERE `e-shopping`.products.categoryId = 2