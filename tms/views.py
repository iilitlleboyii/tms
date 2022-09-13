from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from cms.models import SsAaaaa


# Create your views here.

class HomeView(APIView):
    def post(self, request, *args, **kwargs):
        res_data = request.data
        if (res_data['reg']):
            ss = SsAaaaa.objects.filter(grade='5A', province=res_data['province'], ss_name__regex=res_data['reg'])[:10]
        else:
            ss = SsAaaaa.objects.filter(grade='5A', province=res_data['province'])[:10]
        ss_page = ss[int(res_data['pagenum']) * 10:(int(res_data['pagenum']) * 10 + 10)]
        img_url = 'cloud://tms-6g5jr3dg7070b741.746d-tms-6g5jr3dg7070b741-1309987156/Scenic_Spot_Images/SS_ID_'
        img_type = '.jpg'
        ss_items = []
        for item in ss_page:
            ss_item = {
                'ss_name': item.ss_name,
                'ss_id': item.ss_id,
                'ss_imgurl': img_url + str(item.ss_id) + img_type,
                'ss_info': item.ss_info,
                'ss_price': item.ticket_price
            }
            ss_items.append(ss_item)
            ss_item = {'ss_name': '', 'ss_id': '', 'ss_imgurl': '', 'ss_info': '', 'ss_price': ''}
        return Response(ss_items)
