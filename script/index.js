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

      textoNomes.innerHTML = 'Voce deseja enviar que os(as) ' + names + ' vão participar da festa'
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

confirmarPresenca()