from django.db import models


# Create your models here.
class User(models.Model):
    user_id = models.CharField('用户ID', db_column='user_id', max_length=30, primary_key=True, unique=True)
    user_name = models.CharField('用户名', db_column='user_name', max_length=8)
    user_account = models.CharField('账号', db_column='user_account', max_length=11, unique=True)
    user_password = models.CharField('密码', db_column='user_password', max_length=16)
    user_gender = models.CharField('性别', db_column='user_gender', max_length=2, blank=True, null=True)
    user_age = models.IntegerField('年龄', db_column='user_age', blank=True, null=True)
    user_address = models.CharField('地址', db_column='user_address', blank=True, max_length=50, null=True)
    user_collect = models.CharField('收藏', db_column='user_collect', blank=True, max_length=500, null=True)
    created_date = models.DateTimeField('修改时间', auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'user'

        verbose_name = "用户"
        verbose_name_plural = "用户"
