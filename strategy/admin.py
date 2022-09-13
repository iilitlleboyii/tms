from django.contrib import admin
from strategy.models import Strategy


# Register your models here.
class StrategyAdmin(admin.ModelAdmin):
    list_display = ['strategy_id', 'ss_id', 'ss_name', 'ss_price', 'transport', 'accommodation',
                    'remark', 'route', 'created_date']
    list_editable = []
    search_fields = ['ss_id', 'ss_name']


admin.site.register(Strategy, StrategyAdmin)
