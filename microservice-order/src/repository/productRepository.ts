export async function getProductById(id: string) {
  const productUrl: string = process.env.PRODUCT_SERVICE_URL || 'http://127.0.0.1:5000/api/products';
  
  try {
    const product = await fetch(`${productUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(product);
    return product;
  } catch (err) {
    console.error(err);
    console.log(err);
  }
}
