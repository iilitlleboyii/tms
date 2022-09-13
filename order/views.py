from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
from django.forms.models import model_to_dict
import json


class OrderUploadView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        order_dict = json.loads(res['order_list'])
        for order in order_dict:
            flag = Order.objects.filter(order_id=order['order_id']).exists()
            if flag is False:
                _commodity_list_ = []
                for ticket_item in order['ticket_items']:
                    del ticket_item['imageURL']
                    _commodity_list_.append(ticket_item)
                Order.objects.create(order_id=order['order_id'], user_id=res['user_id'],
                                     commodity_list=_commodity_list_, state_code=order['state_code'],
                                     total_price=order['total_price'])

        return Response({'is_post_order': True})


class OrderDownloadView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        _user_id_ = res['user_id']
        order_list = []
        Order_list = Order.objects.filter(user_id=_user_id_)
        img_url = 'cloud://tms-6g5jr3dg7070b741.746d-tms-6g5jr3dg7070b741-1309987156/Scenic_Spot_Images/SS_ID_'
        img_type = '.jpg'
        for order in Order_list:
            _order_ = model_to_dict(order)
            temp_tickets = eval(_order_['commodity_list'])
            for ss_item in temp_tickets:
                ss_item['imageURL'] = img_url + str(ss_item['ticket_id']) + img_type
            order_data = {
                'order_id': _order_['order_id'],
                'ticket_items': temp_tickets,
                'total_price': _order_['total_price'],
                'state_code': _order_['state_code'],
            }
            order_list.append(order_data)
            order_data = {
                'order_id': '',
                'ticket_items': [],
                'total_price': 0,
                'state_code': '',
            }
        return Response(order_list)


class OrderDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        Order.objects.filter(order_id=res['order_id']).delete()
        return Response({'is_delete': True})


class OrderUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        Order.objects.filter(order_id=res['order_id']).update(state_code='1')
        return Response({'is_update': True})
