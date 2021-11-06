let inputNovaTarefa = document.querySelector('#inputNovaTarefa')
let btnAddTarefa = document.querySelector('#btnAddTarefa')
let listaTarefas = document.querySelector('#listaTarefas')
let janelaEdicao = document.querySelector('#janelaEdicao')
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo')
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa')
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao')
let idTarefaEdit = document.querySelector('#idTarefaEdit')

let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar')

janelaEdicaoBtnFechar.addEventListener('click', e => {
  janelaEdicao.style.display = 'none'
  janelaEdicaoFundo.style.display = 'none'
})

btnAddTarefa.addEventListener('click', e => {
  let tarefa = {
    nome: inputNovaTarefa.value,
    id: gerarid()
  }
  if (inputNovaTarefa.value == '') {
    alert('INSIRA UMA TAREFA')
  } else {
    adicionarTarefa(tarefa)
  }
})

function gerarid() {
  return Math.floor(Math.random() * 3000)
}

function adicionarTarefa(tarefa) {
  let li = criarTagLi(tarefa)
  listaTarefas.appendChild(li)
  inputNovaTarefa.value = ''
}

function criarTagLi(tarefa) {
  let li = document.createElement('li')
  li.id = tarefa.id

  let span = document.createElement('apan')
  span.classList.add('TextoTarefa')
  span.innerHTML = tarefa.nome

  let div = document.createElement('div')

  let btnEditar = document.createElement('button')
  btnEditar.classList.add('btnAcao')
  btnEditar.innerHTML = ' <i class="fa fa-pencil"></i>'
  btnEditar.setAttribute('onclick', 'editar(' + tarefa.id + ')')

  let btnExcluir = document.createElement('button')
  btnExcluir.classList.add('btnAcao')
  btnExcluir.innerHTML = ' <i class="fa fa-trash"></i>'
  btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ')')

  div.appendChild(btnExcluir)
  div.appendChild(btnEditar)

  li.appendChild(span)
  li.appendChild(div)

  btnEditar.addEventListener('click', e => {
    janelaEdicao.style.display = 'block'
    janelaEdicaoFundo.style.display = 'block'
  })
  return li
}

function editar(idTarefa) {
  let li = document.getElementById('' + idTarefa + '')
  if (li) {
    idTarefaEdit.innerHTML = '#' + idTarefa
    inputTarefaNomeEdicao.value = li.innerText
    janelaEdicao.style.display = 'none'
    janelaEdicaoFundo.style.display = 'none'
  } else {
    alert('TAREFA NAO ENCONTRADA')
  }
}

function excluir(idTarefa) {
  let confirmacao = window.confirm(
    'Tem certeza que deseja excluir essa tarefa?'
  )

  if (confirmacao) {
    let li = document.getElementById('' + idTarefa + '')
    if (li) {
      listaTarefas.removeChild(li)
    }
  } else {
    alert('TAREFA NAO ENCONTRADA')
  }
}

btnAtualizarTarefa.addEventListener('click', e => {
  e.preventDefault()
  let idTarefa = idTarefaEdit.innerHTML.replace('#', '')

  let tarefa = {
    nome: inputTarefaNomeEdicao.value,
    id: idTarefa
  }

  let tareafaAtual = document.getElementById('' + idTarefa + '')

  if (tareafaAtual) {
    let li = criarTagLi(tarefa)
    listaTarefas.replaceChild(li, tareafaAtual)
    janelaEdicao.style.display = 'none'
    janelaEdicaoFundo.style.display = 'none'
  } else {
    alert('TAREFA NAO ENCONTRADA')
  }
})
