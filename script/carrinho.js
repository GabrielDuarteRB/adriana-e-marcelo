document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const pixInfo = document.getElementById('pix-info');
    const qrcodeContainer = document.getElementById('qrcode');
    const addMoreItemsButton = document.getElementById('add-more-items');
    const continuePurchaseButton = document.getElementById('continue-purchase');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    // Renderiza os itens do carrinho
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price; // Calcula o total enquanto renderiza os itens
        return `
          <tr>
            <td>
              <img src="${item.image}" alt="${item.title}" class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
              ${item.title}
              <button class="btn btn-danger btn-sm remove-from-cart" data-title="${item.title}">Remover</button>
            </td>
            <td>R$${item.price.toFixed(2)}</td>
          </tr>
        `;
    }).join('');

    // Atualiza o total
    cartTotalElement.textContent = `R$${total.toFixed(2)}`;

    // Adiciona os ouvintes de eventos para os botões de remoção
    document.querySelectorAll('.remove-from-cart').forEach(button => {
      button.addEventListener('click', removeFromCart);
    });

    // Adiciona funcionalidade para o botão "Adicionar mais itens"
    addMoreItemsButton.addEventListener('click', () => {
        window.location.href = '/presentes.html'; // Redireciona para a página de presentes
    });

    // Adiciona funcionalidade para o botão "Continua compra"
    continuePurchaseButton.addEventListener('click', () => {
      if (pixInfo.style.display === 'none') {
          pixInfo.style.display = 'block';
      } else {
          pixInfo.style.display = 'none';
      }
  });

    function removeFromCart(event) {
      const title = event.target.getAttribute('data-title');
      cart = cart.filter(item => item.title !== title);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload(); // Recarrega a página para refletir as mudanças
    }
});
