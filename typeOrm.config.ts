import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'recorder',
    username: 'Admin',
    password: 'password',
    entities: ['dist/**/entities/**/*.entity.js'],
    migrations: ['dist/**/migrations/**/*.js'],
    logging: true,
    // synchronize: false,
});
