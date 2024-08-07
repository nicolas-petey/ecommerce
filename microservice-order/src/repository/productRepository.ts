export async function getProductById(id: string) {
  const productUrl = process.env.PRODUCT_SERVICE_URL;

  try {
    const product = await fetch(`${productUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return product;
  } catch (err) {
    console.error(err);
    console.log(err);
  }
}
