from ninja import Router, ModelSchema, Field
from .models import Ong

router = Router()

class OngSchema(ModelSchema):
    
    class Config:
        model = Ong
        model_fields = [
            "name", "address_line1", "address_number", "neighborhood", 
            "city", "state", "postal_code", "phone", "email"
        ]
        populate_by_name = True

@router.get("/ongs/", response=list[OngSchema])
def list_ongs(request, city: str, state: str):
    return Ong.objects.filter(city__iexact=city, state__iexact=state)

