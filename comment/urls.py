from django.urls import path

from comment import views

urlpatterns = [
    path('comment/', views.CommentView.as_view()),
]
