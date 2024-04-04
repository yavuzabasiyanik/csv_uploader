import csv
from io import StringIO
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Record
from .serializers import RecordSerializer

class UploadCSVView(APIView):
    def post(self, request):
        csv_file = request.FILES['file']
        decoded_file = csv_file.read().decode('utf-8')
        io_string = StringIO(decoded_file)
        reader = csv.DictReader(io_string)
        
        records = []
        for row in reader:
            name = ''
            class_name = ''
            school = ''
            state = ''
            
            for header, value in row.items():
                header = header.lower()
                if 'name' in header:
                    name = value
                elif 'class' in header or 'subject' in header:
                    class_name = value
                elif 'school' in header:
                    school = value
                elif 'state' in header or 'location' in header:
                    state = value
            
            records.append(Record(name=name, class_name=class_name, school=school, state=state))
        
        Record.objects.bulk_create(records)
        
        return Response({'message': 'CSV file uploaded and mapped successfully'})

class RecordListView(generics.ListAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer