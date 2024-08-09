from confluent_kafka import Consumer, KafkaError
import psycopg2
import json

def create_consumer():
    """ Crée et configure un consommateur Kafka. """
    conf = {
        'bootstrap.servers': 'localhost:9093',  # Connexion via le port 9093
        'group.id': 'product-consumer-group',
        'auto.offset.reset': 'earliest',
        'enable.auto.commit': True
    }
    consumer = Consumer(conf)
    consumer.subscribe(['product-topic'])
    
    # Test de connexion à Kafka
    try:
        consumer.poll(1.0)  # Essaye de récupérer un message
        print("Connected to Kafka successfully")
    except Exception as e:
        print(f"Failed to connect to Kafka: {e}")
        consumer.close()
        return None

    return consumer


def create_connection():
    """ Crée une connexion à la base de données PostgreSQL. """
    try:
        connection_params = {
            'dbname': 'product',
            'user': 'product',
            'password': 'ecommerce',
            'host': 'localhost',  # Utilisez localhost puisque vous vous connectez depuis votre machine
            'port': '5440',  # Port mappé pour postgresproduct
            'client_encoding': 'UTF8'  # Forcer l'encodage UTF-8
        }
        print(f"Attempting to connect to database with parameters: {connection_params}")
        connection = psycopg2.connect(**connection_params)
        print("Connected to the database successfully")
        return connection
    except psycopg2.Error as e:
        print(f"Database connection error: {e}")
        return None
    except UnicodeDecodeError as e:
        print(f"Unicode decode error: {e}")
        return None

def save_to_db(connection, action, product):
    """ Enregistre le message du produit dans la base de données PostgreSQL. """
    cursor = connection.cursor()
    try:
        if action == 'add':
            cursor.execute("INSERT INTO product (name, category, price) VALUES (%s, %s, %s)",
                           (product['name'], product['category'], product['price']))
        elif action == 'update':
            cursor.execute("UPDATE product SET name = %s, category = %s, price = %s WHERE id = %s",
                           (product['name'], product['category'], product['price'], product['idProduct']))
        elif action == 'delete':
            cursor.execute("DELETE FROM product WHERE id = %s", (product['idProduct'],))
        connection.commit()
        print("Data saved to database successfully")
    except psycopg2.Error as e:
        connection.rollback()
        print(f"Database error: {e}")
    finally:
        cursor.close()

if __name__ == "__main__":
    consumer = create_consumer()
    connection = create_connection()
    
    if connection is None:
        print("Failed to connect to database. Exiting...")
        exit(1)

    try:
        while True:
            msg = consumer.poll(1.0)

            if msg is None:
                continue
            if msg.error():
                if msg.error().code() != KafkaError._PARTITION_EOF:
                    print(f"Error: {msg.error()}")
            else:
                try:
                    message = json.loads(msg.value().decode('utf-8'))
                    save_to_db(connection, message['action'], message['product'])
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON message: {e}")
                except UnicodeDecodeError as e:
                    print(f"Error decoding message: {e}")
                except Exception as e:
                    print(f"Error processing message: {e}")
    except KeyboardInterrupt:
        print('Interrupted')
    finally:
        consumer.close()
        if connection:
            connection.close()
