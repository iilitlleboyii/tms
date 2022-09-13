import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from comment.models import Comment


# Create your views here.
class CommentView(APIView):
    def post(self, request, *args, **kwargs):
        res = request.data
        comment_dict = json.loads(res['comment_item'])
        Comment.objects.create(user_id=res['user_id'], ticket_id=comment_dict['ticket_id'],
                               ticket_name=comment_dict['ticket_name'], imgurl=comment_dict['imageURL'],
                               trans_value=comment_dict['trans_value'],
                               service_value=comment_dict['service_value'], scene_value=comment_dict['scene_value'],
                               total_value=comment_dict['total_value'], message=comment_dict['message'],
                               image_list=comment_dict['image_list']
                               )
        return Response(True)
