class VagasController {
    constructor(db) {
        this.db = db;
    }

    async getAllVagas() {
        const vagas = await this.db.all('SELECT * from vagas;');
        return vagas;
    }

    async getVagaById(vagaId) {
        const vaga = await this.db.all(`SELECT * from vagas WHERE vagaId = ${vagaId};`);
        return vaga[0];
    }

    async getVagaByCategoriaId(caterogiaId) {
        const vagas = await this.db.all(`SELECT * from vagas WHERE categoriaId = ${categoriaId};`);
        return vagas;
    }

    async insertVaga({ name, categoriaId, descricao }) {
        await this.db.run(`INSERT INTO vagas (name, categoriaId, descricao) VALUES ('${name}', ${categoriaId}, '${descricao}');`);
    }

    async updateVaga(vagaId, { name, categoriaId, descricao }) {
        await this.db.run(`UPDATE vagas SET name = '${name}', categoriaId = ${categoriaId}, descricao = '${descricao}' WHERE vagaId = ${vagaId}`);
    }

    async deleteVagaById(vagaId) {
        await this.db.run(`Delete from vagas WHERE vagaId = ${vagaId}`);
    }

}

module.exports = VagasController;