from flask import Blueprint
from .controllers import add_product, get_products, update_product, delete_product

main_bp = Blueprint('main', __name__)

main_bp.route('/api/products', methods=['POST'])(add_product)
main_bp.route('/api/products', methods=['GET'])(get_products)
main_bp.route('/api/products/<idProduct>', methods=['PUT'])(update_product)
main_bp.route('/api/products/<idProduct>', methods=['DELETE'])(delete_product)
