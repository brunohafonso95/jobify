const { resolve } = require('path');
const initDataBase = require('./config/database');
const CategoriasController = require(resolve(__dirname + 'controllers/categoriasController'));
const VagasController = require(resolve(__dirname +  'controllers/vagasController'));

let categoriasController;
let vagasController;

module.exports = app => {
    // iniciando o banco de dados
    initDataBase()
        .then(db => {
            categoriasController = new CategoriasController(db);
            vagasController = new VagasController(db);
        })
        .catch(error => console.error(error));

    app.get('/', async (req, res) => {
        const categoriasDb = await categoriasController.getAllCategories();
        const vagas = await vagasController.getAllVagas();
        const categorias = categoriasDb.map(categoria => {
            return {
                ...categoria,
                vagas: vagas.filter(vaga => vaga.categoriaId === categoria.categoriaId)
            }
        });
        res.render('home', {
            categorias
        });
    });

    app.get('/vaga/:id', async (req, res) => {
        const vaga = await vagasController.getVagaById(req.params.id);
        res.render('vaga', {
            vaga
        });
    });

    app.get('/admin', async (req, res) => {
        res.render('admin/home');
    });

    app.get('/admin/vagas', async (req, res) => {
        const vagas = await vagasController.getAllVagas(); 
        res.render('admin/vagas', {
            vagas
        });
    });

    app.get('/admin/vagas/update/:id', async (req, res) => {
        const vaga = await vagasController.getVagaById(req.params.id);
        const categorias = await categoriasController.getAllCategories();
        res.render('admin/atualizar-vaga', {
            categorias,
            vaga
        });
    });

    app.post('/admin/vagas/update/:id', async (req, res) => {
        await vagasController.updateVaga(req.params.id, req.body);
        res.redirect('/admin/vagas');
    });

    app.get('/admin/vagas/new', async (req, res) => {
        const categorias = await categoriasController.getAllCategories();
        res.render('admin/nova-vaga', {
            categorias
        });
    });

    app.post('/admin/vagas/new', async (req, res) => {
        await vagasController.insertVaga(req.body);
        res.redirect('/admin/vagas');
    });

    app.get('/admin/vagas/delete/:id', async (req, res) => {
        await vagasController.deleteVagaById(req.params.id); 
        const vagas = await vagasController.getAllVagas(); 
        res.redirect('/admin/vagas');
    });

    app.get('/admin/categorias', async (req, res) => {
        const categorias = await categoriasController.getAllCategories();
        res.render('admin/categorias', {
            categorias
        });
    });

    app.get('/admin/categorias/new', async (req, res) => {
        res.render('admin/nova-categoria');
    });

    app.post('/admin/categorias/new', async (req, res) => {
        await categoriasController.insertCategoria(req.body);
        res.redirect('/admin/categorias');
    });

    app.get('/admin/categorias/update/:id', async (req, res) => {
        const categoria = await categoriasController.getCategoriaById(req.params.id);
        res.render('admin/atualizar-categoria', {
            categoria
        });
    });

    app.post('/admin/categorias/update/:id', async (req, res) => {
        const categoria = await categoriasController.updateCategoria(req.params.id, req.body);
        res.redirect('/admin/categorias');
    });

    app.get('/admin/categorias/delete/:id', async (req, res) => {
        const vagasInThisCategory = await vagasController.getVagaByCategoriaId(req.params.id);
        if(!vagasInThisCategory.length) {
            await categoriasController.deleteCategoriaById(req.params.id);
            res.redirect('/admin/categorias');
        }
    });
};