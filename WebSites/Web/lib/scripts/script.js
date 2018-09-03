var aluno = {};
var tbody = document.querySelector('table tbody');

function Cadastrar() {
    aluno.nome = document.querySelector('#nome').value;
    aluno.sobrenome = document.querySelector('#sobrenome').value;
    aluno.telefone = document.querySelector('#telefone').value;
    aluno.ra = document.querySelector('#ra').value;

    console.log(aluno);

    if (aluno.id === undefined || aluno.id === 0) {
        salvarEstudantes('POST', 0, aluno);
    }
    else {
        salvarEstudantes('PUT', aluno.id, aluno);
    }

    carregaEstudantes();

    $('#myModal').modal('hide');

}
function NovoAluno()
{
    var btnSalvar = document.querySelector('#btnSalvar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};
    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar';

    $('#myModal').modal('show');
}

function Cancelar() {
    var btnSalvar = document.querySelector('#btnSalvar');
    //var btnCancelar = document.querySelector('#btnCancelar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};
    btnSalvar.textContent = 'Cadastrar';

    tituloModal.textContent = 'Cadastrar';

    $('#myModal').modal('hide');
    //if (btnCancelar.textContent != 'Limpar') {
    //    btnCancelar.textContent = 'Limpar';
    //    $('#myModal').modal('hide');
    //}
}

function carregaEstudantes() {
    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `http://localhost:63981/api/Aluno`, true);

    xhr.onload = function () {
        console.log(this.responseText);
        var estudantes = JSON.parse(this.responseText);
        for (var indice in estudantes) {
            adicionaLinha(estudantes[indice]);
        }
    }

    xhr.send();

}

function salvarEstudantes(metodoHTTP, id, corpo) {
    var xhr = new XMLHttpRequest();

    if (id === undefined || id === 0) {
        id = '';
    }

    xhr.open(metodoHTTP, `http://localhost:63981/api/Aluno/${id}`, false);
    //xhr.withCredentials = true; //Testar
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(corpo));

}

function excluirEstudante(id) {
    var xhr = new XMLHttpRequest();
    xhr.open(`DELETE`, `http://localhost:63981/api/Aluno/${id}`, false);
    xhr.send();
}

function excluir(estudante) {
    bootbox.confirm({
        message: `Tem certeza que deseja excluir o ${estudante.nome}?`,
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-success'
            },
            cancel: {
                label: 'Não',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            //console.log('This was logged in the callback: ' + result);
            if (result) {
                excluirEstudante(estudante.id);
                carregaEstudantes();
            }
        }
    });


}

carregaEstudantes();

function editarEstudante(estudante) {
    var btnSalvar = document.querySelector('#btnSalvar');
    //var btnCancelar = document.querySelector('#btnCancelar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = estudante.nome;
    document.querySelector('#sobrenome').value = estudante.sobrenome;
    document.querySelector('#telefone').value = estudante.telefone;
    document.querySelector('#ra').value = estudante.ra;

    btnSalvar.textContent = 'Salvar';
    //btnCancelar.textContent = 'Cancelar';
    tituloModal.textContent = `Editar - ${estudante.nome}`;

    aluno = estudante;

    console.log(estudante.id);
}

function adicionaLinha(estudante) {


    var trow = `<tr>
							<td>${estudante.nome}</td>
							<td>${estudante.sobrenome}</td>
							<td>${estudante.telefone}</td>
							<td>${estudante.ra}</td>
							<td>
                            <button class ="btn btn-info" data-toggle="modal" data-target="#myModal" onclick='editarEstudante(${JSON.stringify(estudante)})'>Editar</button>
                            <button class ="btn btn-danger" onclick='excluir(${JSON.stringify(estudante)})'>Excluir</button>
                            </td>
					    </tr>
					   `
    tbody.innerHTML += trow;
}