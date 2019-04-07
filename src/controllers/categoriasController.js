class CategoriasController {
    constructor(db) {
        this.db = db;
    }

    async getAllCategories() {
        const categorias = await this.db.all('SELECT * from categorias;');
        return categorias;
    }

    async getCategoriaById(categoriaId) {
        const categoria = await this.db.all(`SELECT * from categorias WHERE categoriaId = ${categoriaId};`);
        return categoria[0];
    }

    async insertCategoria({ name }) {
        await this.db.run(`INSERT INTO categorias(name) VALUES('${name}')`);
    }

    async deleteCategoriaById(categoriaId) {
        await this.db.run(`DELETE FROM categorias WHERE categoriaId = ${categoriaId}`);
    }

    async updateCategoria(categoriaId, { name }) {
        await this.db.run(`UPDATE categorias SET name = '${name}' WHERE categoriaId = ${categoriaId}`);
    }
}

module.exports = CategoriasController;