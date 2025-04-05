# api/routers/animals.py
from ninja import Router, ModelSchema, Field
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from .models import Animal, AnimalPhoto

router = Router()

class AnimalPhotoSchema(ModelSchema):
    photo: str = Field(..., alias="URL da Foto")

    class Config:
        model = AnimalPhoto
        model_fields = ["photo"]
        populate_by_name = True

class AnimalSchema(ModelSchema):
    name: str = Field(..., alias="Nome")
    species: str = Field(..., alias="Espécie")
    breed: str = Field(None, alias="Raça")
    age: int = Field(..., alias="Idade")
    description: str = Field(..., alias="Descrição")
    is_adopted: bool = Field(..., alias="Adotado")
    city: str = Field(None, alias="Cidade")
    state: str = Field(None, alias="Estado")
    photos: list[AnimalPhotoSchema] = Field(default_factory=list, alias="Fotos")

    class Config:
        model = Animal
        model_fields = [
            "name", "species", "breed", "age", "description", "is_adopted", "city", "state"
        ]
        populate_by_name = True

@router.get("/animals/", response=list[AnimalSchema], by_alias=True)
def list_animals(request, city: str = None, state: str = None, lat: float = None, lon: float = None, radius: int = 10):
    animals = Animal.objects.prefetch_related("photos").all()
    
    if city and state:
        animals = animals.filter(city__iexact=city, state__iexact=state)
    elif lat is not None and lon is not None:
        point = Point(lon, lat, srid=4326)
        animals = animals.annotate(distance=Distance("location", point)).filter(distance__lte=radius * 1000).order_by("distance")
    
    return [
        {
            **animal.__dict__,
            "photos": [{"photo": photo.photo.url} for photo in animal.photos.all()]
        }
        for animal in animals
    ]
