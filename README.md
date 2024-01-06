# ePoll 

### Setup

To run this application, you need to create a local database. I have used SQL Server and my database is named as pollAppDb. Necessary tables are created by backend code. To connect to your local database, check that ConnectionString is correct. Connection string can be found in the appsettings.json file.
```
ePollServer/appsettings.json

"AllowedHosts": "*",
"ConnectionStrings": {
    "DevConnection": "Server=(local)\\SQLEXPRESS;Database=pollAppDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
```
This project uses NuGet packacges Microsoft.EntityFrameworkCore, Microsoft.EntityFrameworkCore.SqlServer and Microsoft.EntityFrameworkCore.Tools. 
Buid the project and after succesfull buil open Package Manager Console. Make sure the ePollServer project is selected and also make sure that your local server is running. You can make migrations by running commands
```
Add-Migration "initial create"
Update-Database
```
You can now run the project in browser.  

Next open the ClientSide project in code editor. Open file index.jsx that can be found inside api-folder.
```
ePollClient/src/api/index.jsx

export const BASE_URL = 'http://localhost:5120/';

export const ENDPOINTS = {
    question: 'question',
    answer: 'answer',
    both: 'Question/createQuestionWithOptions'
}
```
The BASE_URL should be same as your server address in the project you just opened. Update the address if necessary. Notice that the answer should include only localhost and the port number.  
Now you can run the application.
```
npm run dev
```
Open the server side project Program.cs file and make sure that there is rigth address:
```
ePollServer/Program.cs

app.UseCors(options =>
options.WithOrigins("http://localhost:5173")
.AllowAnyMethod()
.AllowAnyHeader());
```
Modify the useCors function to use your local address where the client side project opened. Now everything should be working.
