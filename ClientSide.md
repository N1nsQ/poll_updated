# REACT Code Explained

## Create.jsx

```javascript
  const createPollObject = () => {
    const pollObject = {
      title: pollTitle,
      options: options.map((option) => option.option),
      votes: [0],
      answerID: [0],
    };
    return pollObject;
  };
```
Luodaan objekti, joka pitää sisällään uuden kyselyn: Otsikko ja vastaukset ovat käyttäjältä saatuja.  
  

```javascript
  const pollTitleChanged = (e) => {
    setPollTitle(e.target.value);
    setNewPollTitle(e.target.value);
  };
```
Funktio lukee käyttäjän syötteen otsikko-kentästä ja tallentaa sen tilaan.  
setNewPollTitle?  

```javascript
const optionChanged = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = e.target.value;
    setOptions(updatedOptions);
  };
```

## Home.jsx

```javascript
useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          //console.log("Data 0:", data[0])
          setQuestionId(data[0].questionID);
          setPollQuestions(data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);
```
* Haetaan data palvelimelta get-metodilla
* 

# Muutamia Huomioita

#### props.child

```javascript
export default function Center(props) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight:'100vh'}}
    >
      <Grid item xs={1}>
        {props.children}
      </Grid>
    </Grid>
  );
}
```
Tässä erityisesti kiinnitä huomiota ```{props.children}``` riviin! Center ottaa propseina vastaan kaiken sisällön, toimien wrapper-tagina vähän niinkuin Card tai Box. props.children on erityispropsi joka tarkoittaa sitä että kaikki kääritty sisältä tulee propseina. Komponentti keskittää sisällön nimensä mukaisesti. Propseina tuleva sisältö menee siis koodissa ```props.children``` rivin paikalle.

#### Validation function

```javascript
    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.name = values.name!= "" ? "" : "Name is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }
```
Tämän funktion toimintaperiaate on se, että viimeisellä rivillä tarkistetaan onko temp-onjektin kaikki arvot tyhjiä. Jos on on, funktio palauttaa arvon***true** ja jos ei, funktio palauttaa arvon **false**
