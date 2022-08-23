from django.urls import path
from .views import RoomView, CreateRoomView

# If URL is blank, call main
# Return main as an HttpResponse

urlpatterns = [
    path('room', RoomView.as_view()),
     path('create-room', CreateRoomView.as_view())
]