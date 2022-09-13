from django.db import models


# Create your models here.
class Strategy(models.Model):
    strategy_id = models.CharField('攻略ID', db_column='strategy_id', max_length=20, primary_key=True, unique=True)
    user_id = models.CharField('用户ID', db_column='user_id', max_length=30, null=False)
    ss_id = models.IntegerField('景区ID', db_column='ss_id', null=False)
    ss_name = models.CharField('景区名称', db_column='ss_name', max_length=50, null=False)
    ss_price = models.DecimalField('门票价格', db_column='ss_price', max_digits=10, decimal_places=2, blank=True,
                                   null=False)
    transport = models.CharField('交通工具', db_column='transport', max_length=4, null=False)
    accommodation = models.CharField('宿食安排', db_column='accommodation', max_length=500, null=False)
    remark = models.CharField('备注事项', db_column='remark', max_length=255, blank=True)
    route = models.CharField('游览路线', db_column='route', max_length=500, null=False)
    created_date = models.DateTimeField('修改时间', auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'strategy'

        verbose_name = "攻略"
        verbose_name_plural = "攻略"
