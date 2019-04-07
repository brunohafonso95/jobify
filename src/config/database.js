const sqlite = require('sqlite');
const dbConnection = sqlite.open('banco.sqlite', { Promise });

module.exports = () => new Promise(async (resolve, reject) => {
    try {
        const db = await dbConnection;
        await db.run('CREATE table if not exists categorias(categoriaId INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);');
        await db.run(`CREATE table if not exists vagas(
            vagaId INTEGER PRIMARY KEY, 
            name TEXT NOT NULL UNIQUE,
            categoriaId INTEGER NOT NULL, 
            descricao TEXT NOT NULL,
            FOREIGN KEY(categoriaId) REFERENCES categorias(categoriaId)
        );`);
        resolve(db);
    } catch (error) {
        reject(error.message);
    }
});
