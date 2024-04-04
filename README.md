Clone the repository:

git@github.com:yavuzabasiyanik/csv_uploader.git

Navigate to the project directory:

cd csv-uploader

Build and run the Docker containers:

docker-compose up --build

CSV File Format
The CSV file should have the following structure:

The first row should contain the header names.
Subsequent rows should contain the data corresponding to each header.
The header names are flexible and can have variations (e.g., "Name", "name", "Full Name", "full_name").
The application will map the headers to the predefined database fields based on naming conventions.


Next Steps

I want to create a pipeline to deploy this app.
