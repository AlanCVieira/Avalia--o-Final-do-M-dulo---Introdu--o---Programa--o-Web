//Salvar user
var username = document.querySelector('#username');
var password = document.querySelector('#password');
var repeatPassword = document.querySelector('#repeatPassword');

const btnLogin = document.querySelector('#btnLogin');
const btnCreate = document.querySelector('#btnCreate');
const btnSair = document.getElementById('sair')

btnLogin?.addEventListener('click', function () {
    return login();
});

btnCreate?.addEventListener('click', function () {
    return register();
});

btnSair?.addEventListener('click', function () {
    return sair();
});


//FUNÇÃO DE LOGIN
function login() {
    const user = {
        username: username.value,
        password: password.value,
    };

    if(
        logged() || 
        verifyFields(user.username, user.password) ||
        userMatch(user)
    ) {
        return;
    }

    window.location.assign('/messages.html')
    return localStorage.setItem('user', JSON.stringify(user));
};

// FUNÇÃO SAIR
function sair() {
    window.localStorage.removeItem('user')
    window.location.assign('/sign-in.html')
}

//FUNÇÃO DE REGISTRO DE USUÁRIO
function register() {
    const users = getAccLocalStorage();

    const newUser = {
        username: username.value,
        password: password.value,
    };

    if (
        verifyFields(newUser.username, newUser.password) || 
        !userExists(newUser.username)
        ) {
            return;
        }
    
    window.location.assign('/sign-in.html')
    return localStorage.setItem("accounts", JSON.stringify([...users, newUser]));
};

function userExists(username) {
    const users = getAccLocalStorage();

        if (users.findIndex(function (user) {
            return user.username === username;
        }) != "-1"
        )   
        {   
            alert('Usuário já cadastrado!')
            return false;
        }
            return true;
};

function verifyFields (username, password) {
        if (!!username &&!!password) {
            return false;   
        }
            alert('Preencha os campos em branco')
            return true;
};

function getAccLocalStorage() {
        const users = localStorage.getItem('accounts');
        return JSON.parse(users) ?? [];
};

function logged() {
    if (!!localStorage.getItem('user')) {
        return true;
    } 
        return false;
};

function userMatch(userToLogin) {
    const users = getAccLocalStorage();

    if (
        users.find(function (user) {
            return (
                user.username === userToLogin.username &&
                user.password === userToLogin.password
                );
            })
        ) {
            
            return false;
        }   
            alert('Usuário ou senha incorretos.')
            return true;
};

//AREA DE RECADOS
var descricao = document.getElementById('description');
var detalhes = document.getElementById('detail')
var btnSalvar = document.getElementById('save');

btnSalvar?.addEventListener('click', salvarInfos);

function salvarInfos() {
    let mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');
    let descricao = document.getElementById('desc').value;
    let detalhes = document.getElementById('detail').value;

    let user = JSON.parse(localStorage.getItem('user'));
    
    if (mensagens == null) {
        mensagens = [];
    } else {
        mensagens.push({
            descricao: descricao,
            detalhes: detalhes,
            username: user.username
        });

        localStorage.setItem('mensagens', JSON.stringify(mensagens));
    }
    printList();
}
printList();

function printList() {
    let mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');
    let lista = document.getElementById('tablePrinted');

    lista.innerHTML = '';

    let user = JSON.parse(localStorage.getItem('user'));

    for (var i = 0; i < mensagens.length; i++) {
        
        if (mensagens[i].username == user.username) {
            lista.innerHTML +=
    
            `<tr id='rowTb ${i}'>
                <td>${[i]}</td>
                <td>${mensagens[i].descricao}</td>
                <td>${mensagens[i].detalhes}</td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="abrirModal(${i})" data-bs-target="#apagar">
                        Apagar
                    </button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" onclick="abrirModalDois(${i})" data-bs-whatever="@mdo" data-bs-target="#editar">
                        Editar
                    </button>
                </td>
            </tr>`
        }
    }
};

const btnRemoveSim = document.getElementById('remove');
const btnSalvarSim = document.getElementById('messageSave')

//EXCLUIR RECADO
function abrirModal(i) {
    btnRemoveSim.onclick = function (){
        excluirRecado(i);
    }
};

function excluirRecado(i) {
    let mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]')

    mensagens.splice(i, 1);

    localStorage.setItem('mensagens', JSON.stringify(mensagens));
    location.reload();
    printList();
};

//SALVAR RECADO EDITADO
function abrirModalDois(i) {
    btnSalvarSim.onclick = function (){
        console.log(salvarRecado(i));
    }
};

function salvarRecado(i) {
    let mensagens = JSON.parse(localStorage.getItem('mensagens'))
    let newDetail = document.getElementById('newDetail').value;

    console.log(mensagens[i].detalhes)
}   