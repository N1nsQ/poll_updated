# ePoll application

## Backend / Visual Studio 2022

Asennetaan tarvittavat NuGet paketit: 
* EntityFrameworkCore
* EntityFrameworkCore.SqlServer
* EntityFrameworkCore.Tools


### Question.cs

```C#
    public class Question
    {
        [Key]
        public int QuestionID { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Title { get; set; }

        public List<Answer> Answers { get; set; }
    
    }
```

* Määritellään Question-taulu: Sillä on sarakkeet QuestionID, Title sekä kysymykseen liittyvät vastaukset ```List<Answer> Answers```
* ```[Key]``` merkkaa pääavainta
* Sting-tyypin arvo vaatii Column määrittelyn.
* Lista vastauksista on viiteavain Answer-tauluun.

#### { get; set; } selitettynä

* Syntaksi käyttää enkapsulointia
* get-metodi palauttaa muuttujan arvon
* set-metodilla asetetaan muuttujaan arvo
* Kentät voidaan määrittelä read-only kentiksi käyttämällä vain get-metodia tai wite-only käyttämällä vain set-metodia
  
### Answer.cs

```C#
public class Answer
{
    [Key]
    public int AnswerID { get; set; }

    public int QuestionID { get; set; }

    [Column(TypeName = "nvarchar(250)")]
    public string Option { get; set; }

    public int Votes { get; set; }

}
```

Answer-taulu kuvastaa vastausvaihtoehtoa, jota käyttäjä voi äänestää. Vastauksella on uniikki id AnswerID, QuestionID jolla se yhdisteään oikeaan kysymykseen, varsinainen vastaus tekstinä (Option) sekä annetut äänet (Votes)

### PollDbContext.cs

Tämä luokka määrittelee tietokantaobjektin ```PollDbContext``` joka laajentaa EntityFrameworkin luokkaa DbContext. Se toimii välikappaleena sovelluksen ja tietokannan välillä.

```C#
public class PollDbContext:DbContext
{
    public PollDbContext(DbContextOptions<PollDbContext> options) : base(options) { }

    public DbSet<Question> Questions { get; set; }

    public DbSet<Answer> Answers { get; set; } 
}
```

Koodi avattuna:  
* ```public class PollDbContext:DbContext``` PollDbContext perii luokan EntityFrameWotkin luokan DbContext
* ```public PollDbContext(DbContextOptions<PollDbContext> options) : base(options) { }```
  * Tässä määritellään luokan konstruktori ```public class PollDbContext()```
  * Sillä on parametrinä ```DbContextOptions<PollDbContext>``` joka sisältää tietokannan asetukset.
  * Nämä asetukset välitetään perittyyn konstruktoriin DbContext-luokan base kontruktoriin.
  * DbContext tarvitsee konfiguraatioasetuksia tietokannan yhteyden määrittelemiseksi.

* Seuraavaksi määritellään tietokanta ja talulut jotka vastaavat ylempänä luotuja luokkia
  * ```public DbSet<Question> Questions { get; set; }``` määrittää Question-taulun
  * ```public DbSet<Answer> Answers { get; set; }``` määrittää Answer-taulun
  * ```DbSet``` on EntityFrameworkin luokka, joka kukaa tietokantataulua ja mahdollistaa kyselyn muokkaamisen C#-objektina


Seuraavaksi PollDbContext-instassi täytyy määritellä käyttöön ja se tehdään muokkaamalla Program.cs tiedostoa.


### Program.cs

Seuraavassa koodinpätkässä otetaan käyttöön yllä luotu PollDbContext
```C#
// dependency injection
builder.Services.AddDbContext<PollDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));
```
* ```Services``` on ominaisuus, joka mahdollistaa palvelujen rekisteröimisen sovelluksen käyttöön.
* ```AddDbContext<PollDbContext>``` Tämä metodi rekisteröi PollDbContext-luokan sovelluksen palveluihin
* ```AddDbContext``` on osa EntityFrameworkia ja se helpottaa tietokantayhteyksien konfigurointia ja käyttöönottoa.
* ```(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")))``` Tämä on lambda-funktio, joka määrittää tietokantayhteyden asetukset.
  * ```builder.Configuration.GetConnectionString("DevConnection")``` Tässä haetaan Connection String joka on määritelty appsettings.json tiedostossa nimellä DevConnection

Kun sovellus käynnistyy, Dependency Injection-järjestelmä automaattisesti injektoi ```PollDbContext```:n sovelluksen komponentteihin. ```PollDbContext``` on määritelty käyttämään SQL Server -tietokantaa.  

#### CORS - Cross Origin Resource Sharing -asetukset  

CORS on turvamekanismi, joka rajoittaa web-sivuston JavaScript-koodin pääsyn resursseihin eri verkkotunnuksilla tai eri porttinumerosta, missä sovellus itse pyörii. 

```C#
app.UseCors(options =>
options.WithOrigins("http://localhost:5173")
.AllowAnyMethod()
.AllowAnyHeader());
```
* ```app.UseCors(options => ...);``` määrittää CORS-asetukset sovelluksen käyttöön.
  * ```options => ...``` on lambda-funktio joka määrittelee CORS-säännöt
* ```options.WithOrigins("http://localhost:5173")``` Määrittelee sallitun verkkotunnuksen/portin, josta voidaan tehdä cross-origin pyyntöjä palvelimelle
* ```.AllowAnyMethod()``` määrittää sen, että sovellus hyväksyy kaikki HTTP- metodit: GET, POST, PUT, DELETE jne.
* ```.AllowAnyHeader()``` määrittää sen, että kaikki HTTP-headerit ovat sallittuja. Headereita ovat esim. Content-Type, Authorization, jne.

The whole Program.cs file: 
```C#
using ePollServer.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PollDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

var app = builder.Build();

app.UseCors(options =>
options.WithOrigins("http://localhost:5173")
.AllowAnyMethod()
.AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### appsettings.json

Appsettings.json -tiedostoon lisätään connection-string, jonka avulla luodaan yhteys tietokantaan.

```C#
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
    "AllowedHosts": "*",
    "ConnectionStrings": {
        "DevConnection": "Server=(local)\\SQLEXPRESS;Database=pollAppDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True;"
    }
}

```

### API Controllers

Luodaan kontrollerit: 
1. Solution Explorer ikkunassa on projektin tiedostot. Etsi sieltä kansio nimeltä Controllers
2. Klikkaa hiiren oikeaa näppäinta kansion päällä ja valitse Add --> Controller...
3. Vasemman puoleisesta valikosta valitaan API
4. Keskelle avautuvasta ikkunasta valitaan API Controller with actions using Entity Framework
5. Valitse Model class sen mukaan, mille luokalle kontrolleria ollaan tekemässä. (Tässä projektissa kontrollerit tehdään luokille Question ja Answer)
6. DbContextClass:iin määritellään aikaisemmin luotu luokka, tässä PollDbContext
7. Annetaan lopuksi kontrollerille kuvaava nimi

Toistetaan tämä kahteen kertaan ja luodaan kontollerit Question Modelille (QuestionController.cs) ja Answer Modelille (AnswerController.cs).  

Mikäli kontrollien luomisessa tulee error viesti liittyen CodeGenerationiin, tarkista NuGet-paketeista että Microsoft.VisualStudio.Web.CodeGeneration.Design -paketti on asennettu. Mikäli se on asennettu ja error-viesti tulee silti, poista asennus ja asenna paketti uudelleen.

Kontrollereissa voidaan nyt nähdä parametri PollDbContext

### QuestionController.cs

Kontrollerin sisällä 

### AnswerController.cs
