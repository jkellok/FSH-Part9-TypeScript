import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';
import axios from 'axios';

interface IProps {
  diaryState: [DiaryEntry[], React.Dispatch<React.SetStateAction<DiaryEntry[]>>];
}

const DiaryEntries = ({diaryEntries}: {diaryEntries: DiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {diaryEntries.map(d => (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <div>Weather: {d.weather}</div>
            <div>Visibility: {d.visibility}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DiaryForm: React.FC<IProps> = ({ diaryState: [diaryEntries, setDiaryEntries] }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiaryEntry({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    }).then(data => {
      setDiaryEntries(diaryEntries.concat(data))
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      } else {
        console.error(error);
        setErrorMessage("An error occurred!");
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    })

    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  }
  return (
    <>
      <h2>Add a new diary entry</h2>
      {errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
      <form onSubmit={diaryEntryCreation}>
        <label htmlFor='date'>Date: </label>
        <input
          id='date'
          name='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          type='date'
        /><br />

        <fieldset>
          <legend>Weather: </legend>
          <label htmlFor='weatherSunny'>sunny</label>
          <input
            id='weatherSunny'
            name='weather'
            value='sunny'
            onChange={(event) => setWeather(event.target.value as Weather)}
            //onChange={() => setWeather(Weather.Sunny)}
            required
            type='radio'
            checked={weather === 'sunny'}
          />
          <label htmlFor='weatherRainy'>rainy</label>
          <input
            id='weatherRainy'
            name='weather'
            value='rainy'
            onChange={(event) => setWeather(event.target.value as Weather)}
            type='radio'
          />
          <label htmlFor='weatherCloudy'>cloudy</label>
          <input
            id='weatherCloudy'
            name='weather'
            value='cloudy'
            onChange={(event) => setWeather(event.target.value as Weather)}
            type='radio'
          />
          <label htmlFor='weatherStormy'>stormy</label>
          <input
            id='weatherStormy'
            name='weather'
            value='stormy'
            onChange={(event) => setWeather(event.target.value as Weather)}
            type='radio'
          />
          <label htmlFor='weatherWindy'>windy</label>
          <input
            id='weatherWindy'
            name='weather'
            value='windy'
            onChange={(event) => setWeather(event.target.value as Weather)}
            type='radio'
          />
        </fieldset>

        <fieldset>
        <legend>Visibility: </legend>
          <label htmlFor='visibilityGreat'>great</label>
          <input
            id='visibilityGreat'
            name='visibility'
            value='great'
            onChange={(event) => setVisibility(event.target.value as Visibility)}
            required
            type='radio'
            checked={visibility === 'great'}
          />
          <label htmlFor='visibilityGood'>good</label>
          <input
            id='visibilityGood'
            name='visibility'
            value='good'
            onChange={(event) => setVisibility(event.target.value as Visibility)}
            type='radio'
          />
          <label htmlFor='visibilityOk'>ok</label>
          <input
            id='visibilityOk'
            name='visibility'
            value='ok'
            onChange={(event) => setVisibility(event.target.value as Visibility)}
            type='radio'
          />
          <label htmlFor='visibilityPoor'>poor</label>
          <input
            id='visibilityPoor'
            name='visibility'
            value='poor'
            onChange={(event) => setVisibility(event.target.value as Visibility)}
            type='radio'
          />
        </fieldset>

        <label htmlFor='comment'>Comment: </label>
        <input
          id='comment'
          name='comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        /><br /><br />
        <button type='submit'>Add new diary entry</button>
      </form>
    </>
  )
}

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <DiaryForm diaryState={[diaryEntries, setDiaryEntries]} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  )
}

export default App
