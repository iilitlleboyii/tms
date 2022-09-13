from django.contrib import admin
from cms.models import SsAaaaa


class SsAaaaaAdmin(admin.ModelAdmin):
    # 展示字段
    list_display = ['ss_id', 'ss_name', 'grade', 'province', 'ticket_price', 'ss_image', 'short_detail', 'address',
                    'service_tele']
    # 列表字段，不能是展示字段的第一个
    list_editable = []

    ordering = ['ss_id']
    search_fields = ['ss_id', 'ss_name']


# Register your models here.
admin.site.register(SsAaaaa, SsAaaaaAdmin)

admin.site.site_header = '爱尚旅游管理后台'  # 设置header
admin.site.site_title = '爱尚旅游管理后台'  # 设置title
admin.site.index_title = '爱尚旅游管理后台'
