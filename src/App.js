import './App.css';
import { useEffect, useState } from 'react';
import useSensor from "./hooks/useSensor";
import Dashboard from "./containers/Dashboard";
import { zip } from 'rxjs';
import { timeInterval } from "rxjs/operators";
function App() {

  const temperature = useSensor();
  const pressure = useSensor();
  const humidity = useSensor();

  const [displayObj, setDisplayObj] = useState({
    temperature: 0,
    pressure: 0,
    humidity: 0,
  });

  const [timer, setTimer] = useState({
      temperature: 0,
      pressure: 0,
      humidity: 0,
  });

  useEffect(() => {
        temperature.pipe(timeInterval()).subscribe(value => {
            setTimer(prevState => ({
                ...prevState,
                temperature: value.interval,
            }))
        })
  }, []);

    useEffect(() => {
        pressure.pipe(timeInterval()).subscribe(value => {
            setTimer(prevState => ({
                ...prevState,
                pressure: value.interval,
            }))
        })
    }, []);

    useEffect(() => {
        humidity.pipe(timeInterval()).subscribe(value => {
            setTimer(prevState => ({
                ...prevState,
                humidity: value.interval,
            }))
        })
    }, []);

  useEffect(() => {
     zip(
          temperature,
          pressure,
          humidity,
      ).subscribe(([temperature, pressure, humidity]) => {
          setDisplayObj({
              temperature,
              pressure,
              humidity,
          });
      });
  }, []);

    useEffect(() => {
        setTimer(prevState => ({
            ...prevState,
            temperature: 0,
        }));
    }, [displayObj.temperature]);

    useEffect(() => {
        setTimer(prevState => ({
            ...prevState,
            pressure: 0,
        }));
    }, [displayObj.pressure]);

    useEffect(() => {
        setTimer(prevState => ({
            ...prevState,
            humidity: 0,
        }));
    }, [displayObj.humidity]);

  return (
    <div className="App">
      { !!(displayObj.temperature || displayObj.humidity || displayObj.pressure) && (
          <Dashboard display={displayObj} timer={timer} />
      ) }
    </div>
  );
}

export default App;
