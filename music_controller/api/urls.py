from django.urls import path
from .views import main

# If URL is blank, call main
# Return main as an HttpResponse

urlpatterns = [
    path('home', main)
]