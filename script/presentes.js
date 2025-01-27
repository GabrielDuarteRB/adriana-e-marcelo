const tituloModal = document.getElementById('tituloModalPresente');
const descricaoModal = document.getElementById('descricaoModalPresente');
const qrcodeModal = document.getElementById('qrcodeModal');
const precoModalPresente = document.getElementById('precoModalPresente');
const codigoQrCodeModal = document.getElementById('codigoQrCodeModal');

function criandoCardPresente() {
  fetch('../presentes.json')
  .then(response => response.json())
  .then(data => {
    const giftCardsContainer = document.getElementById('gift-cards');

    data.forEach(gift => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');

      card.innerHTML = `
        <div class="card h-100">
          <div class="card" style="background-image: url('${gift.image}'); background-size: cover; background-position: center; height: 200px;"></div>
          <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-title fw-bold font-1">${gift.title}</h4>
            <p class="card-text font-1">${gift.description}</p>
            <div>
              <p class="card-text card-text-price font-1"><strong>Preço: R$${gift.price}</strong></p>
              <button type="button" data-bs-toggle="modal" data-bs-target="#modalPresente" class="btn btn-primary add-to-cart font-1" data-gift='${JSON.stringify(gift)}'>Comprar presente</button>
            </div>
          </div>
        </div>
      `;

      giftCardsContainer.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', openModal);
    });
  })
  .catch(error => console.error('Erro ao buscar os dados:', error));
}

function openModal(event) {
  const button = event.target;
  const gift = JSON.parse(button.getAttribute('data-gift'));

  qrcodeModal.innerHTML = '';
  const qrImage = document.createElement('img');
  qrImage.src = '../img/qrCodes/' + gift.qrCode;
  qrImage.alt = 'QR Code';
  qrImage.classList.add('img-fluid');
  qrImage.classList.add('w-50');

  qrcodeModal.appendChild(qrImage);

  tituloModal.innerHTML = gift.title;
  descricaoModal.innerHTML = gift.description;
  codigoQrCodeModal.innerHTML = gift.codigo
  precoModalPresente.innerHTML = "Escaneie o qr code a cima ou copie e cole o código no pix para presentear no valor de <b>R$" + gift.price + "</b>"

 
}

criandoCardPresente();
