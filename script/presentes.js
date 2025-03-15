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
      card.classList.add('mb-4');

      card.innerHTML = `
        <div class="card h-100">
          <img class="card-image" src="${gift.image}" style="height: 250px; padding: 16px;"></img>
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
  const numericPrice = parseFloat(gift.price.replace(",", "."));
  qrImage.src = '../img/qrCodes/qrcode-' + numericPrice + '.png';
  qrImage.alt = 'QR Code';
  qrImage.classList.add('img-fluid');
  qrImage.classList.add('w-50');

  qrcodeModal.appendChild(qrImage);

  tituloModal.innerHTML = gift.title;
  descricaoModal.innerHTML = gift.description;
  console.log(codigoQrCodeModal)
  codigoQrCodeModal.value = gift.codigo
  precoModalPresente.innerHTML = "Entre no aplicativo do seu banco e escaneie o QR Code ou clique no botão e cole no pix para presentear no valor de <b>R$" + gift.price + "</b>"

}

function copiarQRCode() {
  const textoParaCopiar = codigoQrCodeModal.value;

  navigator.clipboard.writeText(textoParaCopiar)
  .then(() => {
    const toast = new bootstrap.Toast(document.getElementById('toastSucesso'));
    toast.show();
  })
  .catch((err) => {
    console.error("Erro ao copiar o código:", err);
    alert("Erro ao copiar o código. Por favor, tente novamente.");
  });
}

criandoCardPresente();
