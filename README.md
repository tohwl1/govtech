1. Download postgresql
2. add path environmental variables:
   C:\Program Files\PostgreSQL\13\bin
   C:\Program Files\PostgreSQL\13\lib
3. Open cmd and type:
   Psql -U postgres
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
7. Cd backend and type “npm install” and “node server.js”
