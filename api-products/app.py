from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://product:ecommerce@localhost:5440/product'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modèle de Produit
class Product(db.Model):
    idProduct = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Product {self.name}>'

# Initialiser la base de données
with app.app_context():
    db.create_all()

# Endpoints

# Ajouter un nouveau produit
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], category=data['category'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

# Récupérer la liste des produits
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"idProduct": p.idProduct, "name": p.name, "category": p.category, "price": p.price} for p in products]), 200

# Mettre à jour un produit
@app.route('/api/products/<idProduct>', methods=['PUT'])
def update_product(idProduct):
    data = request.get_json()
    product = Product.query.get(idProduct)
    if product is None:
        return jsonify({"message": "Product not found"}), 404
    
    product.name = data.get('name', product.name)
    product.category = data.get('category', product.category)
    product.price = data.get('price', product.price)
    db.session.commit()
    return jsonify({"message": "Product updated successfully"}), 200

# Supprimer un produit
@app.route('/api/products/<idProduct>', methods=['DELETE'])
def delete_product(idProduct):
    product = Product.query.get(idProduct)
    if product is None:
        return jsonify({"message": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)