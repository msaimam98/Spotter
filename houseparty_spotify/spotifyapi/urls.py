from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURLView.as_view()),
    path('is-authenticated', IsAuthenticatedView.as_view()),
    path('redirect', spotify_callback),
    path('current-song', CurrentSongView.as_view()),
    path('pause-song', PauseSong.as_view()),
    path('play-song', PlaySong.as_view()),
    path('skip-song', SkipSong.as_view()),
]