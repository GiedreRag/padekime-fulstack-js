import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const database_reset = false;

async function dbSetup() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (database_reset) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }

    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (database_reset) {
        await usersTable(connection);
        await rolesTable(connection);
        await tokensTable(connection);
        await storiesTable(connection);

        await generateUsers(connection);
        await generateRoles(connection);
        await generateStories(connection);
    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(60) NOT NULL,
                        email varchar(60) NOT NULL,
                        password_hash varchar(200) NOT NULL,
                        role_id tinyint(1) NOT NULL DEFAULT 2,
                        createdAt date NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci`;
                  
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users table.");
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        token varchar(40) NOT NULL,
                        user_id int(10) NOT NULL,
                        createdAt timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create tokens table.");
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(15) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles table.");
        console.log(error);
        throw error;
    }
}

async function storiesTable(db) {
    try {
        const sql = `CREATE TABLE stories (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        title varchar(30) NOT NULL,
                        story mediumtext NOT NULL,
                        img varchar(200) NOT NULL,
                        amount DECIMAL(10, 2) NOT NULL,
                        current_amount DECIMAL(10, 2) NOT NULL,
                        left_amount DECIMAL(10, 2) NOT NULL,
                        user_id int(10) NOT NULL,
                        createdAt date NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
                  
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create stories table.");
        console.log(error);
        throw error;
    }
}

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('user');`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create roles into a role' table.");
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash('jonas@jonas.lt')}', 1),
                     ('Ona Onaite', 'ona@ona.lt', '${hash('ona@ona.lt')}', 2),
                     ('Linas Linaitis', 'linas@linas.lt', '${hash('linas@linas.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create users into a users' table.");
        console.log(error);
        throw error;
    }
}

async function generateStories(db) {
    try {
        const sql = `INSERT INTO stories (title, story, img, amount, current_amount, left_amount, user_id) 
                    VALUES ('Aldo istorija', 'Mazas berniukas su sunkia liga', 'img', 20000, 0, 0, 2),
                    ('Linos istorija', 'Lina su sunkia liga', 'img', 2000, 0, 0, 3),
                    ('Dariaus istorija', 'Berniukas su sunkia liga', 'img', 5000, 0, 0, 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log("Couldn't create stories into a stories' table.");
        console.log(error);
        throw error;
    }
}

export const connection = await dbSetup();