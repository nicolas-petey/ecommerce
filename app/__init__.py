from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)

    with app.app_context():
        # Importer les modèles
        from . import models
        
        # Créer les tables
        db.create_all()

        # Enregistrer les blueprints
        from .views import main_bp
        app.register_blueprint(main_bp)

        return app
