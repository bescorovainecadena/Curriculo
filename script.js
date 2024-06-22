document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById('app');

  const container = document.createElement('div');
  container.className = 'informacoes_pessoais';

  const h1 = document.createElement('h1');
  h1.textContent = 'Currículo';

  const h2 = document.createElement('h2');
  h2.textContent = 'Informações Pessoais:';

  const labelsAndInputs = [
    { label: 'Nome completo:', type: 'text', id: 'nome', name: 'nome' },
    { label: 'Data de Nascimento:', type: 'date', id: 'data_nascimento', name: 'data_nascimento' },
    { label: 'Endereço completo:', type: 'text', id: 'endereco', name: 'endereco' },
    { label: 'Telefone:', type: 'text', id: 'telefone', name: 'telefone' },
    { label: 'E-mail:', type: 'text', id: 'email', name: 'email' }
  ];

  container.appendChild(h1);
  container.appendChild(h2);

  labelsAndInputs.forEach(item => {
    const label = document.createElement('label');
    label.setAttribute('for', item.id);
    label.textContent = item.label;

    const input = document.createElement('input');
    input.setAttribute('type', item.type);
    input.setAttribute('id', item.id);
    input.setAttribute('name', item.name);

    container.appendChild(label);
    container.appendChild(input);
  });

  const formacaoContainer = document.createElement('div');
  formacaoContainer.className = 'formacao';
  formacaoContainer.innerHTML = `
    <h2>Formação:</h2>
    <div class="formacao-boxes"></div>
    <button type="button" class="add-formacao">Adicionar Formação</button>
  `;

  container.appendChild(formacaoContainer);

  const experienciasContainer = document.createElement('div');
  experienciasContainer.className = 'experiencias';
  experienciasContainer.innerHTML = `
    <h2>Experiências Profissionais:</h2>
    <div class="experiencias-boxes"></div>
    <button type="button" class="add-experiencia">Adicionar Experiência</button>
  `;

  container.appendChild(experienciasContainer);

  const saveButton = document.createElement('input');
  saveButton.setAttribute('type', 'button');
  saveButton.setAttribute('value', 'Salvar');
  saveButton.addEventListener('click', function() {
    alert('Informações salvas com sucesso!');
  });

  container.appendChild(saveButton);

  const printButton = document.createElement('input');
  printButton.setAttribute('type', 'button');
  printButton.setAttribute('value', 'Imprimir PDF');
  printButton.addEventListener('click', function() {
    prepararImpressao();
  });

  container.appendChild(printButton);

  app.appendChild(container);

  document.querySelector('.add-formacao').addEventListener('click', () => {
    const box = document.createElement('div');
    box.className = 'formacao-box';
    box.innerHTML = `
      <label for="curso">Curso:</label>
      <input type="text" name="curso" class="curso">
      <label for="instituicao">Instituição:</label>
      <input type="text" name="instituicao" class="instituicao">
      <label for="ano_conclusao">Ano de Conclusão:</label>
      <input type="text" name="ano_conclusao" class="ano_conclusao">
      <button type="button" class="remove-box">Remover</button>
    `;
    document.querySelector('.formacao-boxes').appendChild(box);

    box.querySelector('.remove-box').addEventListener('click', () => {
      box.remove();
    });
  });

  document.querySelector('.add-experiencia').addEventListener('click', () => {
    const box = document.createElement('div');
    box.className = 'experiencia-box';
    box.innerHTML = `
      <label for="empresa">Empresa:</label>
      <input type="text" name="empresa" class="empresa">
      <label for="cargo">Cargo:</label>
      <input type="text" name="cargo" class="cargo">
      <label for="periodo">Período:</label>
      <input type="text" name="periodo" class="periodo">
      <button type="button" class="remove-box">Remover</button>
    `;
    document.querySelector('.experiencias-boxes').appendChild(box);

    box.querySelector('.remove-box').addEventListener('click', () => {
      box.remove();
    });
  });

  function prepararImpressao() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const formacoes = document.querySelectorAll('.formacao-box');
    const experiencias = document.querySelectorAll('.experiencia-box');

    let formacoesHTML = '';
    formacoes.forEach((formacao) => {
      const curso = formacao.querySelector('.curso').value;
      const instituicao = formacao.querySelector('.instituicao').value;
      const anoConclusao = formacao.querySelector('.ano_conclusao').value;

      formacoesHTML += `
        <div class="formacao-box">
          <p><strong>Curso:</strong> ${curso}</p>
          <p><strong>Instituição:</strong> ${instituicao}</p>
          <p><strong>Ano de Conclusão:</strong> ${anoConclusao}</p>
        </div>
      `;
    });

    let experienciasHTML = '';
    experiencias.forEach((experiencia) => {
      const empresa = experiencia.querySelector('.empresa').value;
      const cargo = experiencia.querySelector('.cargo').value;
      const periodo = experiencia.querySelector('.periodo').value;

      experienciasHTML += `
        <div class="experiencia-box">
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Cargo:</strong> ${cargo}</p>
          <p><strong>Período:</strong> ${periodo}</p>
        </div>
      `;
    });

    const conteudo = `
      <h1>Currículo</h1>
      <h2>Informações Pessoais:</h2>
      <p><strong>Nome completo:</strong> ${nome}</p>
      <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
      <p><strong>Endereço completo:</strong> ${endereco}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>E-mail:</strong> ${email}</p>

      <h2>Formação:</h2>
      ${formacoesHTML}

      <h2>Experiências Profissionais:</h2>
      ${experienciasHTML}
    `;

    const janelaImprimir = window.open('', '', 'width=800,height=600');
    janelaImprimir.document.write('<html><head>');
    janelaImprimir.document.write('<title>Currículo</title>');
    janelaImprimir.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
    janelaImprimir.document.write('</head><body>');
    janelaImprimir.document.write(conteudo);
    janelaImprimir.document.write('</body></html>');
    janelaImprimir.document.close();
    janelaImprimir.print();
  }
});

