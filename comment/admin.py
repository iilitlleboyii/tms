from django.contrib import admin
from comment.models import Comment


class CommentAdmin(admin.ModelAdmin):
    # 展示字段
    list_display = ['comment_id', 'ticket_id', 'ticket_name', 'trans_value', 'service_value', 'scene_value',
                    'total_value', 'message', 'imgurl', 'user_id']
    # 列表字段，不能是展示字段的第一个
    list_editable = []


# Register your models here.
admin.site.register(Comment, CommentAdmin)
