export const WHATSAPP_NUMBER = '5519997857685';

export const formatWhatsAppMessage = (
  customerName: string,
  customerPhone: string,
  customerAddress: string,
  items: Array<{ name: string; price: number; quantity: number }>,
  total: number,
  notes?: string
) => {
  const itemsList = items
    .map(item => `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const message = `Olá! Sou *${customerName}*
  Telefone: ${customerPhone}
  Endereço: ${customerAddress}

  Meu pedido:
  ${itemsList}
  Total: R$ ${total.toFixed(2)}

  ${notes ? `Observações: ${notes}` : ''}`;

  return encodeURIComponent(message);
};

export const openWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
};