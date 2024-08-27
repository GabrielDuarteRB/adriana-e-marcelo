function confirmarPresenca(e) {
  let nameCounter = 1; 
  const form = document.getElementById('rsvpForm');
  const submitForm = document.getElementById('submitForm');
  const abrirModal = document.getElementById('abrirModal');
  const textoNomes = document.getElementById('textoNomes');
  const enviadoComSucessoModal = new bootstrap.Modal(document.getElementById('enviadoComSucesso'));

    document.getElementById('addNameBtn').addEventListener('click', function() {
        nameCounter++;
        const inputContainer = document.getElementById('inputContainer');
        
        
        const newInputGroup = document.createElement('div');
        newInputGroup.classList.add('input-group');
        newInputGroup.classList.add('mb-3');
        newInputGroup.classList.add('align-items-center');

      
        const newLabel = document.createElement('span');
        newLabel.setAttribute('class', 'input-group-text');
        newLabel.textContent = 'Nome:';

        newInputGroup.innerHTML = `
            <div class="input-group-prepend">
                <span class="input-group-text">Nome:</span>
            </div>
            <input type="text" id="name${nameCounter}" name="names[]" class="form-control" required>
            <span class="remove-btn pe-auto"><i class="bi bi-trash"></i></span>
        `;

        inputContainer.appendChild(newInputGroup);
        attachRemoveEvent(newInputGroup.querySelector('.remove-btn'));
    });

    submitForm.addEventListener('click', function(event) {
        
      const inputs = document.querySelectorAll('input[name="names[]"]');
      const names = [];

      inputs.forEach(input => {
        if (input.value.trim()) {
            names.push(input.value);
        }
      });

      if (names.length === 0) {
        alert('Por favor, adicione pelo menos um nome.');
        return;
      }

      const googleFormId = '1FAIpQLSeY9UquCR8C_z5rkLWaDE52OsCSesAbcw4lmsbQPj19iHPbIQ';
      const entryName = 'entry.399250699';
      const url = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;

      const postData = new URLSearchParams();

      names.forEach(name => {
        postData.append(entryName, name);
      });

      fetch(url, {
          method: 'POST',
          body: postData.toString(), 
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          }
      })
      .then(response => response.text())

      enviadoComSucessoModal.show();
      limparCampos()
      
    });

    abrirModal.addEventListener('click', () => {
      const inputs = document.querySelectorAll('input[name="names[]"]');
      const names = [];

      inputs.forEach(input => {
        if (input.value.trim()) {
            names.push(input.value);
        }
      });

      if (names.length === 0) {
        alert('Por favor, adicione pelo menos um nome.');
        return;
      }

      textoNomes.innerHTML = 'Deseja confirmar a presença de ' + names + '?'
    })
}

function attachRemoveEvent(buttonRemove) {
  buttonRemove.addEventListener('click', function() {
      const inputGroup = this.parentElement;
      inputGroup.remove();
  });
}

function limparCampos() {
  const inputs = document.querySelectorAll('input[name="names[]"]');
  inputs.forEach((input, index) => {
      if (index > 0) {
          input.parentElement.remove()
      } else {
          input.value = ''
      }
  });
}

function enviarMusica() {
  const btnMusica = document.getElementById('btnMusica');
  const inputMusica = document.getElementById('inputMusica');
  const modalBodyMusica = document.getElementById('modalBodyMusica')

  btnMusica.addEventListener('click', () => {
    console.log('teste')
    const googleFormId = '1FAIpQLSfwPXeu9KwBS63UnoPA_X3HQW62NhsUfw2xkl6-KmyswGh91A';
    const entryName = 'entry.906798177';
    const url = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;

      const postData = new URLSearchParams();
      postData.append(entryName, inputMusica.value);

      fetch(url, {
          method: 'POST',
          body: postData.toString(), 
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          }
      })
      .then(response => response.text())

      modalBodyMusica.innerHTML = '<p>Música enviada com sucesso!</p>'

  })
}

function voltarTextoMusica() {
  const btnMusicaFechar = document.getElementById('btnMusicaFechar')
  const modalBodyMusica = document.getElementById('modalBodyMusica')

  btnMusicaFechar.addEventListener('click', () => {
      modalBodyMusica.innerHTML = `
        <p>Presença confirmada! Diz aí uma música que você acha que não pode faltar na nossa festa!</p>        
        <input type="text" id="inputMusica" name="" class="form-control">
        <button type="button" id="btnMusica" class="btn btn-primary botao-enviar mt-3 w-100 font-4">Enviar</button>
      `

      enviarMusica()
  })
}

enviarMusica()
confirmarPresenca()
voltarTextoMusica()