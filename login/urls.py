from django.urls import path, include
from .views import GoogleLoginView, GoogleLogoutView, usuari_grup
app_name = "login"
urlpatterns = [
    path("", GoogleLoginView.as_view(), name="account_login"),
    path("logout/", GoogleLogoutView.as_view(), name="logout"),
    path('grup/<int:pk>/', usuari_grup, name='grup-add'),
]