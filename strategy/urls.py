from django.urls import path
from strategy import views


urlpatterns = [
    path('strategy/', views.StrategyView.as_view()),
]