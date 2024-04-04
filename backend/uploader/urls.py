from django.urls import path
from .views import UploadCSVView, RecordListView

urlpatterns = [
    path('upload-csv/', UploadCSVView.as_view(), name='upload_csv'),
    path('records/', RecordListView.as_view(), name='record_list'),
]