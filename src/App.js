import { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import bg from './images/bg.jpg'
import './App.css'

function GetGita(){
  const [chapter, setChapter] = useState("");
  const [gitaChp, setGitaChp] = useState(null);
  const [getVerse, setGetVerse] = useState(null);
  const fetchData = (chp) => {
    if (!chp) return;   // avoid empty requests
    axios
      .get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chp}/`,
        {
          headers:{
            'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
            'x-rapidapi-key': '1a406bd530mshc5b5f970dd24483p14913bjsn69a636302906'
          }
        }
      )
      .then((response)=>{
        if(!response) return;
        console.log(response.data);
        setGitaChp(response.data);
      })
      .catch((error)=>{
        console.error( `Error: ${error.response?.status}, ${error.message}`);
      })
  }
  const fetchVerse = (chp) => {
    axios
      .get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chp}/verses/`, {
        headers:{
          'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com',
          'x-rapidapi-key': '1a406bd530mshc5b5f970dd24483p14913bjsn69a636302906'
        }
      })
      .then(res=>{
        if(!res) return;
        console.log(res.data);
        setGetVerse(res.data);
      })
      .catch(err=>{
        console.error(`Error: ${err.response?.status}, ${err.message}`);
      })
  }
  useEffect(()=>{
    if (chapter) {
      fetchData(chapter);
      fetchVerse(chapter);
    }
  },[])
  const handleSubmission = (event) => {
    event.preventDefault();
    fetchData(chapter);
    fetchVerse(chapter);
  }
  return(
    <>
    <div 
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: "100px",
        paddingBottom: "100px"
      }}
    >
      <h1 className="text-warning fw-bold mb-5">गीता ज्ञान {"(Geeta Gyan)"}</h1>
      <div className="container-fluid text-center">
        <form onSubmit={handleSubmission}>
          <div className="input-group mb-5 mx-auto" style={{ width: "80%" }}>
            <input
              className="form-control p-3"
              type="number"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="Enter Chapter Number"
              min={1}
              max={18}
            />
            <button type="submit" className="btn btn-warning ps-3 pe-3">
              Get Chapter
            </button>
          </div>
        </form>

        {gitaChp && (
          <div
            className="container-fluid"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <h3 className="fw-bold text-warning">
              अध्याय-{gitaChp.chapter_number}-{gitaChp.name}
            </h3>
            <h3 className="mb-3 text-warning">{gitaChp.slug}</h3>
            <h4 className="mb-3 text-warning">{gitaChp.name_meaning}</h4>
            <p className="text-light">
              <strong>Summary in Hindi: </strong>
              {gitaChp.chapter_summary_hindi}
            </p>
            <p className="text-light">
              <strong>Summary in English: </strong>
              {gitaChp.chapter_summary}
            </p>
          </div>
        )}
        <h3 className="text-warning fw-bold mt-4">श्लोक</h3>
        <div className="container" style={{maxHeight: "500px", overflowY: "scroll"}}>
          {getVerse && getVerse.map((verse, idx)=>(
            <div 
              key={idx}
              className="container-fluid pt-4 pb-4"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                justifyContent: "space-evenly",
                borderBottom: "2px solid white"}}>
              <p className="text-warning fw-bold mb-0">श्लोक {verse.verse_number}: {verse.text}</p>
              <p className="mb-0"><strong className="text-light">Transliteration: {verse.transliteration} </strong> <br/><strong className="text-warning">Word Meanings:  {verse.word_meanings}</strong></p>
              <p className="text-light mb-0 fw-bold">Description: {verse.translations[0]?.description}</p>
              <p className="mb-0"><strong className="text-warning"> ~ {verse.translations[0]?.author_name}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default GetGita;
