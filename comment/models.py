from django.db import models


# Create your models here.
class Comment(models.Model):
    comment_id = models.IntegerField('评论ID', db_column='comment_id', primary_key=True, auto_created=True, null=False)
    user_id = models.CharField('用户ID', db_column='user_id', max_length=30, null=False)
    ticket_id = models.IntegerField('景区ID', db_column='ticket_id', null=False)
    ticket_name = models.CharField('景区名称', db_column='ticket_name', max_length=50, null=False)
    imgurl = models.CharField('景区图', db_column='imageURL', max_length=200, null=False)
    trans_value = models.DecimalField('交通评分', db_column='trans_value', max_digits=3, decimal_places=1, null=False)
    service_value = models.DecimalField('服务评分', db_column='service_value', max_digits=3, decimal_places=1, null=False)
    scene_value = models.DecimalField('景区评分', db_column='scene_value', max_digits=3, decimal_places=1, null=False)
    total_value = models.DecimalField('总评分', db_column='total_value', max_digits=3, decimal_places=1, null=False)
    message = models.CharField('评价理由', db_column='message', max_length=500, blank=True, null=False)
    image_list = models.TextField('评价图', db_column='image_list', max_length=500, null=True, blank=True)
    created_date = models.DateTimeField('修改时间', auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'comment'
