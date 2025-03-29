from django.contrib.auth.models import User, Group
from ninja import Router
from ninja.orm import ModelSchema

router = Router()

from ninja import ModelSchema
from django.contrib.auth.models import User
from pydantic import Field

class UserCreateSchema(ModelSchema):
    username: str = Field(..., alias="Nome de usuário")
    email: str = Field(..., alias="E-mail")
    password: str = Field(..., alias="Senha")
    first_name: str = Field(..., alias="Nome")
    last_name: str = Field(..., alias="Sobrenome")

    class Config:
        model = User
        model_fields = ["username", "email", "password", "first_name", "last_name"]


@router.post("/create_user/")
def create_user(request, user_data: UserCreateSchema):
    if User.objects.filter(username=user_data.username).exists():
        return {"error": "Não é possível criar um usuário com esse username"}
    
    user = User.objects.create_user(
        username=user_data.username,
        email=user_data.email,
        password=user_data.password,
        first_name=user_data.first_name,
        last_name=user_data.last_name
    )
    user.is_staff = True  # Permite acesso ao Django Admin
    user.save()
    
    group, _ = Group.objects.get_or_create(name="usuarios")
    user.groups.add(group)
    
    return {"success": "Usuário criado com sucesso"}
