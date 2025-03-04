"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import CharacterFavorites, Characters, PlanetFavorites, Planets, Products, db, Users


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

@api.route('/characters', methods=['GET', 'POST'])
def characters():
    response_body = {}
    if request.method == 'GET':
        characters = db.session.execute(db.select(Characters)).scalars()
        response_body['message'] = "List of characters"
        response_body['results'] = [ character.serialize() for character in characters ]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        character = Characters(name=data['name'],
                               height=data['height'],
                               mass=data['mass'],
                               hair_color=data['hair_color'],
                               skin_color=data['skin_color'],
                               eye_color=data['eye_color'],
                               birth_year=data['birth_year'],
                               gender=data['gender'])
        db.session.add(character)
        db.session.commit()
        response_body['message'] = 'Product created successfully'
        response_body['results'] = character.serialize()
        return response_body, 200
    
@api.route('/characters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character_id(id):
    response_body = {}
    character = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
    if not character:
        response_body['message'] = f'The character with id {id} does not exist'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f"Details character with id {id}"
        response_body['results'] = character.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json 
        character.name = data.get("name", character.name)
        character.height = data.get("height", character.height)
        character.mass = data.get("mass", character.mass)
        character.hair_color = data.get("hair_color", character.hair_color)
        character.skin_color = data.get("skin_color", character.skin_color)
        character.eye_color = data.get("eye_color", character.eye_color)
        character.birth_year = data.get("birth_year", character.birth_year)
        character.gender = data.get("gender", character.gender)
        db.session.commit()
        response_body['message'] = f"Edit character with id {id} successfully"
        response_body['results'] = character.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(character)
        db.session.commit()
        response_body['message'] = f"Delete character with id {id}"
        response_body['results'] = {}
        return response_body, 200
    
@api.route('/planets', methods=['GET', 'POST'])
def planets():
    response_body = {}
    if request.method == 'GET':
        planets = db.session.execute(db.select(Planets)).scalars()
        response_body['message'] = "List of planets"
        response_body['results'] = [ planet.serialize() for planet in planets ]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        planet = Planets(name=data['name'],
                         diameter=data['diameter'],
                         rotation_period=data['rotation_period'],
                         orbital_period=data['orbital_period'],
                         gravity=data['gravity'],
                         population=data['population'],
                         climate=data['climate'],
                         terrain=data['terrain'])
        db.session.add(planet)
        db.session.commit()
        response_body['message'] = "Planet created successfully"
        response_body['results'] = planet.serialize()
        return response_body, 200

@api.route('/planets/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planets_id(id):
    response_body = {}
    planet = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()

    if not planet:
        response_body['message'] = f'The planet with id {id} does not exist'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Details planet with id {id}'
        response_body['results'] = planet.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json

        planet.name = data.get("name", planet.name)
        planet.diameter = data.get("diameter", planet.diameter)
        planet.rotation_period = data.get("rotation_period", planet.rotation_period)
        planet.orbital_period = data.get("orbital_period", planet.orbital_period)
        planet.gravity = data.get("gravity", planet.gravity)
        planet.population = data.get("population", planet.population)
        planet.climate = data.get("climate", planet.climate)
        planet.terrain = data.get("terrain", planet.terrain)

        db.session.commit()
        response_body['message'] = f"Edit planet with id {id} successfully"
        response_body['results'] = planet.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(planet)
        db.session.commit()
        response_body['message'] = f"Delete planet with id {id}"
        response_body['results'] = {}
        return response_body, 200

@api.route('/favorites/<int:user_id>', methods=['GET'])
def favorites(user_id):
    response_body = {}
            
    character_favorites = db.session.execute(
        db.select(Characters)
        .join(CharacterFavorites, Characters.id == CharacterFavorites.character_id)
        .where(CharacterFavorites.user_id == user_id)
    ).scalars()

        
    planet_favorites = db.session.execute(
        db.select(Planets)
        .join(PlanetFavorites, Planets.id == PlanetFavorites.planet_id)
        .where(PlanetFavorites.user_id == user_id)
    ).scalars()

    response_body["favorite_characters"] = [char.serialize() for char in character_favorites]
    response_body["favorite_planets"] = [planet.serialize() for planet in planet_favorites]
    return response_body, 200

@api.route('/favorites/<int:user_id>/planets', methods=['POST'])
def add_favorite_planet(user_id):
    response_body = {}
    data = request.json

    planet_id = data.get("planet_id")

    new_favorite = PlanetFavorites(user_id=user_id, planet_id=planet_id)
    db.session.add(new_favorite)
    db.session.commit()
    response_body['message'] = "Planet add"
    return response_body, 200

@api.route('/favorites/<int:user_id>/planets/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(user_id, planet_id):
    response_body = {}
    planet = db.session.execute(
        db.select(PlanetFavorites).where(
            PlanetFavorites.user_id == user_id,
            PlanetFavorites.planet_id == planet_id
        )
    ).scalar()

    db.session.delete(planet)
    db.session.commit()

    response_body['message'] = "Planet delete"
    return response_body, 200