from django.contrib import admin
from user.models import User


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'user_name', 'user_account', 'user_password', 'user_gender', 'user_age', 'user_address',
                    'created_date']
    list_editable = []
    search_fields = ['user_account']


admin.site.register(User, UserAdmin)
