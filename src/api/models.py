from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), nullable=True)
    last_name = db.Column(db.String())

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "first_name": self.first_name,
                "last_name": self.last_name}

class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=True)
    price = db.Column(db.Float, nullable=False)

class Bills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow())  # Default, el dia de creación 
    total = db.Column(db.Float, nullable=False)
    bill_adress = db.Column(db.String)
    status = db.Column(db.Enum('pending', 'paid', 'cancel', name='status'), nullable=False)
    payment = db.Column(db.Enum('visa', 'amex', 'paypal', name='payment'), nullable=False)

class BillItems(db.Model):
    __tablename__ = 'bill_items'
    id = db.Column(db.Integer, primary_key=True)
    price_per_unit = db.Column(db.Float, nullable=False) 
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)

class Posts(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    body = Column(String)
    date = Column(Date)
    image_url = Column(String)
    user_id = Column(Integer)

class Comments(db.Model):
    id = Column(Integer, primary_key=True)
    body = Column(String)
    user_id = Column(Integer)
    post_id = Column(Integer)

class Medias(db.Model):
    id = Column(Integer, primary_key=True)
    type = Column(Enum('image', 'video', name='media_type'))
    url = Column(String)
    post_id = Column(Integer)

class Followers(db.Model):
    id = Column(Integer, primary_key=True)
    following_id = Column(Integer)
    follower_id = Column(Integer)

class CharacterFavorites(db.Model):
    __tablename__ = 'character_favorites'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    character_id = Column(Integer)

class PlanetFavorites(db.Model):
    __tablename__ = 'planet_favorites'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    planet_id = Column(Integer)

class Characters(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    height = Column(String)
    mass = Column(String)
    hair_color = Column(String)
    skin_color = Column(String)
    eye_color = Column(String)
    birth_year = Column(String)
    gender = Column(String)

class Planets(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    diameter = Column(String)
    rotation_period = Column(String)
    orbital_period = Column(String)
    gravity = Column(String)
    population = Column(String)
    climate = Column(String)
    terrain = Column(String)
