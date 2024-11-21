import { jsPDF } from 'jspdf';

export const generatePDF = (products, cart) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Purchase Receipt', 105, 20, null, null, 'center');

  // Detalles de los productos
  let yPosition = 30;
  doc.setFontSize(12);
  doc.text('Product', 20, yPosition);
  doc.text('Quantity', 80, yPosition);
  doc.text('Unit Price', 120, yPosition);
  doc.text('Total', 160, yPosition);
  yPosition += 10;

  products.forEach((product) => {
    doc.text(product.name, 20, yPosition);
    doc.text(product.quantity.toString(), 80, yPosition);
    doc.text(`$${product.priceAtPurchase.toFixed(2)}`, 120, yPosition);
    doc.text(`$${(product.priceAtPurchase * product.quantity).toFixed(2)}`, 160, yPosition);
    yPosition += 10;
  });

  // Total de la compra
  yPosition += 10;
  doc.setFontSize(14);
  doc.text('Total Amount: ', 20, yPosition);
  doc.text(`$${cart.totalAmount.toFixed(2)}`, 160, yPosition);

  // Descargar el PDF
  doc.save(`purchase_receipt_${cart._id}.pdf`);
};