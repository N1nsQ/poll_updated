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
