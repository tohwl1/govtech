1. Download postgresql
2. add path environmental variables:
   C:\Program Files\PostgreSQL\13\bin
   C:\Program Files\PostgreSQL\13\lib
3. Open cmd and type:
   psql -U postgres
   password
4. Create database govtech;
5. \c govtech
6. CREATE TABLE csvs(
   user_id VARCHAR(255) NOT NULL,
   user_name VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL,
   salary float8 NOT NULL,
   PRIMARY KEY (user_id),
   UNIQUE(user_id,user_name)
   );
7. right click "govtech-master" folder and click on "git bash here"
8. type "cd backend" and type “npm install” and “node server.js”
9. right click "govtech-master" folder and click on "git bash here'
10. type "cd frontend" and type “npm install” and “npm start”

P.S you have to refresh the page after uploading the CSV to see the uploaded content
