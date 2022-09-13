from django.urls import path

from user import views

urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('user/', views.UserView.as_view()),
    path('collectdownload/', views.CollectDownloadView.as_view()),
    path('collectupdate/', views.CollectUpdateView.as_view()),
]
