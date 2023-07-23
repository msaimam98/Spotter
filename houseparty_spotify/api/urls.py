from .views import GetRoomView, LeaveRoomView, RoomView, CreateRoomView, JoinRoomView, UpdateRoomView, UserInRoomView
from django.urls import path

urlpatterns = [
    path('rooms', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('join-room', JoinRoomView.as_view()),
    path('user-in-room', UserInRoomView.as_view()),
    path('leave-room', LeaveRoomView.as_view()),
    path('update-room', UpdateRoomView.as_view()),
]