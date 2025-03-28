const confirmaEnvio = new bootstrap.Modal(document.getElementById('confirmaEnvio'));
const submitForm = document.getElementById('submitForm');
const abrirModal = document.getElementById('abrirModal');
const textoNomes = document.getElementById('textoNomes');
const enviadoComSucessoModal = new bootstrap.Modal(document.getElementById('enviadoComSucesso'));
const adultSection = document.getElementById("adultSectionNames");
const kidsSection = document.getElementById("KidSectionNames");
const qntdKid = document.getElementById("qntd-kid");
const qntdAdult = document.getElementById("qntd-adult");
const quantityAdultInput = document.getElementById("quantity-adult");
const quantityKidsInput = document.getElementById("quantity-kids");

function confirmarPresenca(e) {

  function updateNameInputs() {
    const numAdults = parseInt(quantityAdultInput.value) || 0;
    const numKids = parseInt(quantityKidsInput.value) || 0; 

    const AdultsNames = adultSection.querySelectorAll(`input[name="adult[]"]`).length
    const KidsNames = kidsSection.querySelectorAll(`input[name="kid[]"]`).length
   
    
    if(numAdults < AdultsNames) {
      clearInputs(adultSection, numAdults, 'adult');
      console.log(numAdults)
      if(numAdults == 0) {
        qntdAdult.classList.add('d-none');
      }

    } else {
      let num = numAdults - AdultsNames
      if(numAdults > 0) {
        qntdAdult.classList.remove('d-none');
      }

      for(let i = 0; i < num; i++) {
        const adultInput = createNameInput('adult');
        adultSection.appendChild(adultInput);
      }
    }

    if(numKids < KidsNames) {
      clearInputs(kidsSection, numKids, 'kid');

      if(numKids == 0) {
        qntdKid.classList.add('d-none');
      }
    } else {
      let num = numKids - KidsNames
      if(numKids > 0) {
        qntdKid.classList.remove('d-none');
      }

      for(let i = 0; i < num; i++) {
        const kidInput = createNameInput('kid');
        kidsSection.appendChild(kidInput);
      }
    }
    


  }

  function createNameInput(forName) {
    const div = document.createElement("div");
    div.className = "mb-3";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.name = `${forName}[]`;
    input.placeholder = `Nome completo:`;

    div.appendChild(input);

    return div;
  }

  function clearInputs(section, numItems, type) {
    let divs = section.querySelectorAll('.mb-3');
    const cut =  Array.from(divs).slice(0, numItems)
    
    section.innerHTML = '';
    cut.forEach(item => {
      section.appendChild(item);
    });
  }

  quantityAdultInput.addEventListener("input", updateNameInputs);
  quantityKidsInput.addEventListener("input", updateNameInputs);
}


function enviarForm() {
  submitForm.addEventListener('click', function(event) {
        
    const adultInputs = document.querySelectorAll('input[name="adult[]"]');
    const kidInputs = document.querySelectorAll('input[name="kid[]"]');
    const names = '';

    const postData = new URLSearchParams();

    const entryAdult = 'entry.399250699';
    const entryKid = 'entry.1875595689'

    adultInputs.forEach(input => {
      postData.append(entryAdult, input.value);
    });

    kidInputs.forEach(input => {
      postData.append(entryKid, input.value);
    });
  
    const googleFormId = '1FAIpQLSeY9UquCR8C_z5rkLWaDE52OsCSesAbcw4lmsbQPj19iHPbIQ';

    const url = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;

    fetch(url, {
        method: 'POST',
        body: postData.toString(), 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(response => response.text())
  
    limparCampos()
    enviadoComSucessoModal.show();
    
  });
}

function abrirModalFunction() {
  abrirModal.addEventListener('click', () => {
    const adultInputs = document.querySelectorAll('input[name="adult[]"]');
    const kidInputs = document.querySelectorAll('input[name="kid[]"]');
    let blocked = false
    
    const names = [];
  
    adultInputs.forEach(input => {
      if (input.value.trim()) {
          names.push(input.value);
      } else if (!blocked) {
        blocked = true
        alert('Por favor, preencha todos os campos!');
        return;
      }
    });

    kidInputs.forEach(input => {
      if (input.value.trim()) {
          names.push(input.value);
      } else if (!blocked) {
        blocked = true
        alert('Por favor, preencha todos os campos!');
        return;
      }
    });

    if(blocked) return
  
    if (names.length === 0) {
      alert('Por favor, adicione pelo menos um nome!');
      return;
    }
  
    let formattedNames;
    if (names.length === 1) {
      formattedNames = names[0];
    } else if (names.length === 2) {
      formattedNames = names.join(' e ');
    } else {
      formattedNames = names.slice(0, -1).join(', ') + ' e ' + names[names.length - 1];
    }
  
    confirmaEnvio.show();

    textoNomes.innerHTML = 'Deseja confirmar a presença de ' + formattedNames + '?';
  });
}


function attachRemoveEvent(buttonRemove) {
  buttonRemove.addEventListener('click', function() {
      const inputGroup = this.parentElement;
      inputGroup.remove();
  });
}

function limparCampos() {
  adultSection.innerHTML = ''
  kidsSection.innerHTML = ''
  quantityAdultInput.value  = 0
  quantityKidsInput.value = 0

  qntdKid.classList.add('d-none');
  qntdAdult.classList.add('d-none');
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

function rolarTela() {
  document.getElementById('scroll-button').addEventListener('click', function() {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}

rolarTela()
enviarMusica()
enviarForm()
confirmarPresenca()
voltarTextoMusica()
abrirModalFunction()