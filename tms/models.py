# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ScenicSpot(models.Model):
    ss_name = models.CharField(db_column='SS_Name', max_length=50)
    address = models.CharField(db_column='Address', max_length=70, blank=True, null=True)
    ss_id = models.IntegerField(db_column='SS_ID', primary_key=True)
    grade = models.CharField(db_column='Grade', max_length=5, blank=True, null=True)
    city = models.CharField(db_column='City', max_length=10, blank=True, null=True)
    lng_wgs84 = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    lat_wgs84 = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    ss_info = models.CharField(db_column='SS_Info', max_length=500, blank=True, null=True)
    ss_image = models.CharField(db_column='SS_Image', max_length=50, blank=True,
                                null=True)
    ticket_price = models.DecimalField(db_column='Ticket_Price', max_digits=10, decimal_places=0, blank=True,
                                       null=False)
    service_tele = models.CharField(db_column='Service_Tele', max_length=15, blank=True,
                                    null=True)

    class Meta:
        managed = False
        db_table = 'scenic_spot'


class SsAaaaa(models.Model):
    ss_name = models.CharField('景区名称', db_column='SS_Name', max_length=50)
    address = models.CharField('景区地址', db_column='Address', max_length=70, blank=True,
                               null=True)
    ss_id = models.IntegerField('景区ID', db_column='SS_ID', primary_key=True)
    grade = models.CharField('等级', db_column='Grade', max_length=5, blank=True, null=True)
    province = models.CharField('所属省份', db_column='Province', max_length=10, blank=True,
                                null=True)
    lng_wgs84 = models.DecimalField('经度', max_digits=10, decimal_places=0, blank=True, null=True)
    lat_wgs84 = models.DecimalField('纬度', max_digits=10, decimal_places=0, blank=True, null=True)
    ss_info = models.CharField('景区简介', db_column='SS_Info', max_length=500, blank=True,
                               null=False)
    ss_image = models.CharField('景区样图', db_column='SS_Image', max_length=50, blank=True,
                                null=True)
    ticket_price = models.DecimalField('门票价格', db_column='Ticket_Price', max_digits=10, decimal_places=2, blank=True,
                                       null=False)
    service_tele = models.CharField('服务电话', db_column='Service_Tele', max_length=15, blank=True,
                                    null=True)

    class Meta:
        managed = False
        db_table = 'ss_aaaaa'

        verbose_name = "景区"
        verbose_name_plural = "景区"

    # 控制显示长度，必须在adminx的list_display变量中改为函数名
    def short_detail(self):
        if (self.ss_info):
            if len(self.ss_info) > 50:
                return '{}...'.format(str(self.ss_info)[0:50])
            else:
                return self.ss_info

    # short_detail.allow_tags = True
    short_detail.short_description = '景区简介'
