from ninja import Router, ModelSchema, Field
from .models import Ong

router = Router()

class OngSchema(ModelSchema):
    name: str = Field(..., alias="Nome")
    address_line1: str = Field(..., alias="Logradouro")
    address_number: str = Field(..., alias="Número")
    neighborhood: str = Field(..., alias="Bairro")
    city: str = Field(..., alias="Cidade")
    state: str = Field(..., alias="Estado")
    postal_code: str = Field(..., alias="CEP")
    phone: str = Field(..., alias="Telefone")
    email: str = Field(..., alias="E-mail")

    class Config:
        model = Ong
        model_fields = [
            "name", "address_line1", "address_number", "neighborhood", 
            "city", "state", "postal_code", "phone", "email"
        ]
        populate_by_name = True

@router.get("/ongs/", response=list[OngSchema], by_alias=True)
def list_ongs(request, city: str, state: str):
    return Ong.objects.filter(city__iexact=city, state__iexact=state)

