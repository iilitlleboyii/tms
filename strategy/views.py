from rest_framework.views import APIView
from rest_framework.response import Response
from strategy.models import Strategy
from django.forms.models import model_to_dict
import json


# Create your views here.
class StrategyView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        steps_dict = json.loads(res['steps'])
        route_list = []
        for step in steps_dict:
            route_list.append(str(steps_dict.index(step)) + ':' + step['desc'] + ' ' + step['text'])
        _route_ = '->'.join(route_list)
        # print(_route_)
        Strategy.objects.create(strategy_id=res['strategy_id'], user_id=res['user_id'], ss_id=res['ss_id'],
                                ss_name=res['ss_name'], ss_price=res['ss_price'], transport=res['ss_trans'],
                                accommodation=res['accommodation'], remark=res['remark'], route=_route_)
        # _strategy_ = Strategy.objects.filter(strategy_id=res['strategy_id']).first()
        # strategy = model_to_dict(_strategy_)
        return Response({'is_post_str': True})
