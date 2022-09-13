from django.db import models

# Create your models here.
from django.utils.html import format_html


class Order(models.Model):
    order_id = models.CharField('订单ID', db_column='order_id', max_length=30, primary_key=True)
    user_id = models.CharField('用户ID', db_column='user_id', max_length=30, null=False)
    commodity_list = models.CharField('门票列表', db_column='commodity_list', max_length=500, null=False)
    state_code = models.CharField('状态码', db_column='state_code', max_length=2, null=False)
    total_price = models.DecimalField('支付金额(￥)', db_column='total_price', max_digits=10, decimal_places=2, null=False)
    created_date = models.DateTimeField('修改时间', auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'order'

        verbose_name = "订单"
        verbose_name_plural = "订单"

    def code2hans(self):
        if self.state_code == '0':
            color_code = 'red'
            return format_html('<span style="color: {};">{}</span>', color_code, '未付款')
        else:
            color_code = 'green'
            return format_html('<span style="color: {};">{}</span>', color_code, '已付款')

    code2hans.short_description = '支付状态'

    def serialize_commodity_list(self):
        commodity_list_dict = eval(self.commodity_list)
        show_detail = ''
        for commodity in commodity_list_dict:
            show_detail += commodity['ticket_name'] + ' ' + '×' + ' ' + str(commodity['ticket_num']) + '\n'
        return format_html('<span style="color: blue;">{}</span>', show_detail)
        # return show_detail
    serialize_commodity_list.short_description = '门票列表'
