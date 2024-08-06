from flask import request, jsonify
from .models import Product
from . import db

def add_product():
    data = request.get_json()
    new_product = Product(name=data['name'], category=data['category'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

def get_products():
    products = Product.query.all()
    return jsonify([{"idProduct": p.idProduct, "name": p.name, "category": p.category, "price": p.price} for p in products]), 200

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

def delete_product(idProduct):
    product = Product.query.get(idProduct)
    if product is None:
        return jsonify({"message": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
