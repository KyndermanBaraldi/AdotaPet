from ninja import Router, ModelSchema, Field
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import Animal, AnimalPhoto, Ong

router = Router()

class AnimalPhotoSchema(ModelSchema):
    class Config:
        model = AnimalPhoto
        model_fields = ["photo"]

class OngSchema(ModelSchema):
    class Config:
        model = Ong
        model_fields = [
            "name", "address_line1", "address_number", "neighborhood", "city", "state", "postal_code", "phone", "email"
        ]

class AnimalSchema(ModelSchema):
    photos: list[AnimalPhotoSchema] = Field(default_factory=list)
    ong: OngSchema = None

    class Config:
        model = Animal
        model_fields = [
            "name", "species", "breed", "age", "description", "is_adopted", "city", "state"
        ]

@router.get("/animals/", response=list[AnimalSchema])
def list_animals(request, city: str = None, state: str = None, lat: float = None, lon: float = None, radius: int = 10):
    animals = Animal.objects.select_related("ong").prefetch_related("photos").all()
    
    if city and state:
        animals = animals.filter(city__iexact=city, state__iexact=state)
    elif lat is not None and lon is not None:
        point = Point(lon, lat, srid=4326)
        animals = animals.annotate(distance=Distance("location", point)).filter(distance__lte=radius * 1000).order_by("distance")
    
    return [
        {
            "name": animal.name,
            "species": animal.species,
            "breed": animal.breed,
            "age": animal.age,
            "description": animal.description,
            "is_adopted": animal.is_adopted,
            "city": animal.city,
            "state": animal.state,
            "photos": [{"photo": photo.photo.url} for photo in animal.photos.all()],
            "ong": {
                "name": animal.ong.name,
                "address_line1": animal.ong.address_line1,
                "address_number": animal.ong.address_number,
                "neighborhood": animal.ong.neighborhood,
                "city": animal.ong.city,
                "state": animal.ong.state,
                "postal_code": animal.ong.postal_code,
                "phone": animal.ong.phone,
                "email": animal.ong.email,
            } if animal.ong else None
        }
        for animal in animals
    ]

