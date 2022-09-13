from django.urls import path
from order import views

urlpatterns = [
    path('order/upload/', views.OrderUploadView.as_view()),
    path('order/download/', views.OrderDownloadView.as_view()),
    path('order/delete/', views.OrderDeleteView.as_view()),
    path('order/update/', views.OrderUpdateView.as_view()),
]
