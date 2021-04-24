from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User, Group


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        email = sociallogin.user.email.lower().split("@")
        if email[1] != "sapalomera.cat":
            raise ImmediateHttpResponse(render(request, "accounts/login.html"))


class MyAccountAdapter(DefaultAccountAdapter):

    def get_signup_redirect_url(self, request):
        path = "/grup/{id}/"
        return path.format(id=request.user.id)

    def get_login_redirect_url(self, request):
        email = request.user.email
        user = User.objects.get(email=email)
        grups = user.groups.all()
        if not grups:
            path = "/grup/{id}/"
            return path.format(id=request.user.id)
        else:
            path = "/aplicacions/"
            return path