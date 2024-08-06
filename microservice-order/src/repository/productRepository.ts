export async function getProductById(id: string) {
  try {
    const product = await fetch(`http://127.0.0.1:5000/api/products/${id}`, {
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
