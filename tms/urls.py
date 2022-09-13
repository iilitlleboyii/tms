from django.urls import path

from cms import views


urlpatterns = [
    path('home/', views.HomeView.as_view()),
]