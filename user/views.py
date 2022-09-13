import json

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import User
from cms.models import SsAaaaa
from django.forms.models import model_to_dict


# Create your views here.
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        User.objects.create(user_id=res['user_id'], user_name=res['user_name'], user_account=res['user_account'],
                            user_password=res['user_password'])
        return Response({'if_register': True})


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        user_info = {}
        is_login = False
        return_res = [is_login, user_info]
        _user_ = User.objects.filter(user_id=res['user_id'], user_account=res['user_account']).first()
        if res['user_password'] == _user_.user_password:
            _user_info_ = model_to_dict(_user_)
            _user_info_.pop('user_password')
            user_info = _user_info_
            is_login = True
            return_res = [is_login, user_info]
        return Response(return_res)


class UserView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        User.objects.filter(user_id=res['user_id']).update(user_name=res['user_name'],
                                                           user_age=res['user_age'],
                                                           user_gender=res['user_gender'],
                                                           user_address=res['user_address'])
        _user_ = User.objects.filter(user_id=res['user_id']).first()
        _user_info_ = model_to_dict(_user_)
        _user_info_.pop('user_password')
        user_info = _user_info_
        return Response([True, user_info])


class CollectDownloadView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        _user_ = User.objects.filter(user_id=res['user_id']).first()
        _user_info_ = model_to_dict(_user_)
        collect_list = []
        if _user_info_['user_collect']:
            collect_list = eval(_user_info_['user_collect'])
        return Response(collect_list)


class CollectUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        collect_dict = json.loads(res['collect_list'])
        if collect_dict:
            User.objects.filter(user_id=res['user_id']).update(user_collect=collect_dict)
        else:
            User.objects.filter(user_id=res['user_id']).update(user_collect=None)
        return Response({'is_update': True})
