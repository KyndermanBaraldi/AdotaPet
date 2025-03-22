# api.py
from http import HTTPStatus
from ninja import NinjaAPI, Router, Schema


api = NinjaAPI(title='AdotaPet Api', version='1.0.0', description='API para AdotaPet')

router = Router()

api.add_router('v1/', router)

class StatusSchema(Schema):
    status: str


@router.get('healthcheck', response=StatusSchema)
def healthcheck(request):
    return HTTPStatus.OK, {'status': 'ok'}