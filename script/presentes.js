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
            <img src="${gift.image}" class="card-img-top" alt="${gift.title}">
            <div class="card-body">
              <h5 class="card-title">${gift.title}</h5>
              <p class="card-text">${gift.description}</p>
              <p class="card-text"><strong>Preço: R$${gift.price.toFixed(2)}</strong></p>
              <button class="btn btn-primary add-to-cart" data-title="${gift.title}" data-price="${gift.price}" data-image="${gift.image}">Adicionar ao carrinho</button>
            </div>
          </div>
        `;

        giftCardsContainer.appendChild(card);
      });

      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
      });
    })
    .catch(error => console.error('Erro ao buscar os dados:', error));
}

function addToCart(event) {
    const button = event.target;
    const title = button.getAttribute('data-title');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const gift = { title, price, image };

    cart.push(gift);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    Toastify({
        text: `${title} foi adicionado ao carrinho.`,
        duration: 3000, // Duração em milissegundos
        close: true, // Adiciona um botão de fechar
        gravity: "top", // Posição na tela (topo ou fundo)
        position: 'left', // Posição na tela (direita ou esquerda)
        backgroundColor: "linear-gradient(to right, #878787, #aeaeae)", // Cor do fundo
    }).showToast();
}

criandoCardPresente();
