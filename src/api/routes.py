"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import Products, db, Users


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    # opcion 1: standar
    # results = []
    # for row in rows:
    #     results.append(row.serialize())
    # opcion 2: list comprehesion
    # variable = [ objetivo for item in iterable ]
    results = [ row.serialize() for row in rows ]
    response_body['message'] = f"List of users"
    response_body['results'] = results
    return response_body, 200

@api.route('/products', methods=['GET', 'POST'])
def products():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Products)).scalars()
        response_body['message'] = f"List of products"
        response_body['results'] = [ row.serialize() for row in rows ]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Products(name=data['name'], 
                       description=data.get('description', None),  # si en el body no mandas un atributo le pones el .get(el valor, si no hay valor)
                       price=data['price'])
        db.session.add(row)
        db.session.commit()
        print(data)
        response_body['message'] = f"Product created successfully"
        response_body['result'] = row.serialize()
        return response_body, 200
    

@api.route('/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def product_id(id):
    response_body = {}
    row = db.session.execute(db.select(Products).where(Products.id == id)).scalar()
    if not row:
        response_body['message'] = f'The product with id {id} does not exist' 
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f"Details product with id {id}"
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get("name", row.name)
        row.description = data.get("description", row.description )
        row.price = data.get("price", row.price)
        db.session.commit()
        response_body['message'] = f"Edit product with id {id} successfully"
        response_body['result'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit() 
        response_body['message'] = f"Delete product with id {id}"
        response_body['result'] = {}
        return response_body, 200