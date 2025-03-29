# api.py
from http import HTTPStatus
from ninja import NinjaAPI, Router
from user.api import router as user_router
from .schemas import StatusSchema

api = NinjaAPI(title='AdotaPet Api', version='1.0.0', description='API para AdotaPet')

router = Router()

api.add_router('v1', router)
api.add_router('v1/users/', user_router)

@router.get(
    'healthcheck',
    response=StatusSchema,
    tags=['Health Check'],
    summary='Health Check Summary',
    description='Verificação de status que permite monitorar a saúde da API.'
)
def healthcheck(request):
    return HTTPStatus.OK, {'status': 'ok'}