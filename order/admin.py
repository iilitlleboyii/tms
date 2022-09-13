from django.contrib import admin
from order.models import Order
# from django.forms import TextInput, Textarea
# from django.db import models


# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    # 展示字段
    list_display = ['order_id', 'user_id', 'code2hans', 'serialize_commodity_list', 'total_price', 'created_date']
    # 列表字段，不能是展示字段的第一个
    list_editable = []
    # -表示降序显示
    ordering = ['-created_date']
    search_fields = ['order_id', 'user_id']
    # formfield_overrides = {
    #     models.CharField: {'widget': TextInput(attrs={'size': '20'})},
    #     models.TextField: {'widget': Textarea(attrs={'rows': 4, 'cols': 40})},
    # }


admin.site.register(Order, OrderAdmin)
