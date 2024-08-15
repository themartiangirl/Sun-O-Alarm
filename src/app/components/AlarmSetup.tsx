// "use client";

// import React, { useState } from 'react';
// import axios from 'axios';

// const AlarmSetup = () => {
//   const [year, setYear] = useState('');
//   const [month, setMonth] = useState('01');
//   const [day, setDay] = useState('01');
//   const [time, setTime] = useState('');
//   const [mood, setMood] = useState('Happy');
//   const [genre, setGenre] = useState('Pop');

//   const handleSetAlarm = async () => {
//     if (!year || !month || !day || !time) {
//       alert('Please select a year, month, day, and time');
//       return;
//     }

//     const alarmDateTime = `${year}-${month}-${day}T${time}`;

//     try {
//       const response = await axios.post('/api/set_alarm', {
//         time: alarmDateTime,
//         mood,
//         genre,
//         isAlarmTone: true,
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error('Failed to set alarm time:', error);
//       alert('Failed to set alarm time');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-5 bg-gray-100 rounded-lg shadow-md">
//       <p className="mb-4 text-lg font-bold">Set Alarm Time</p>
      
//       <input 
//         type="number" 
//         placeholder="Year" 
//         value={year} 
//         onChange={(e) => setYear(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       />

//       <select 
//         value={month} 
//         onChange={(e) => setMonth(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       >
//         <option value="01">January</option>
//         <option value="02">February</option>
//         <option value="03">March</option>
//         <option value="04">April</option>
//         <option value="05">May</option>
//         <option value="06">June</option>
//         <option value="07">July</option>
//         <option value="08">August</option>
//         <option value="09">September</option>
//         <option value="10">October</option>
//         <option value="11">November</option>
//         <option value="12">December</option>
//       </select>

//       <select 
//         value={day} 
//         onChange={(e) => setDay(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       >
//         {Array.from({ length: 31 }, (_, i) => (
//           <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
//             {String(i + 1).padStart(2, '0')}
//           </option>
//         ))}
//       </select>

//       <input 
//         type="time" 
//         value={time} 
//         onChange={(e) => setTime(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       />

//       <select 
//         value={mood} 
//         onChange={(e) => setMood(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       >
//         <option value="Happy">Happy</option>
//         <option value="Calm">Calm</option>
//         <option value="Energetic">Energetic</option>
//         <option value="Relaxed">Relaxed</option>
//       </select>

//       <select 
//         value={genre} 
//         onChange={(e) => setGenre(e.target.value)} 
//         className="mb-2 p-2 border rounded-md"
//       >
//         <option value="Pop">Pop</option>
//         <option value="Jazz">Jazz</option>
//         <option value="Classical">Classical</option>
//         <option value="Rock">Rock</option>
//       </select>

//       <button 
//         onClick={handleSetAlarm} 
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Set Alarm
//       </button>
//     </div>
//   );
// };

// export default AlarmSetup;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Alarm {
  id: number;
  time: string;
  mood: string;
  genre: string;
  audioUrl: string;
}

const AlarmSetup = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("08");
  const [day, setDay] = useState("15");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState("Happy");
  const [customMood, setCustomMood] = useState("");
  const [genre, setGenre] = useState("Pop");
  const [customGenre, setCustomGenre] = useState("");
  const [alarms, setAlarms] = useState<Alarm[]>([]);  // Updated with Alarm interface

  const handleSetAlarm = async () => {
    const selectedMood = mood === "Custom" ? customMood : mood;
    const selectedGenre = genre === "Custom" ? customGenre : genre;

    if (!year || !month || !day || !time || !selectedMood || !selectedGenre) {
      alert("Please fill in all fields");
      return;
    }

    const alarmDateTime = `${year}-${month}-${day}T${time}`;

    try {
      const response = await axios.post("/api/set_alarm", {
        time: alarmDateTime,
        mood: selectedMood,
        genre: selectedGenre,
        isAlarmTone: true,
      });

      const newAlarm: Alarm = {
        id: alarms.length + 1,
        time: alarmDateTime,
        mood: selectedMood,
        genre: selectedGenre,
        audioUrl: response.data.audioUrl,
      };

      setAlarms([...alarms, newAlarm]);
    } catch (error) {
      console.error("Failed to set alarm time:", error);
      alert("Failed to set alarm time");
    }
  };

  const playAlarm = (alarm: Alarm) => {
    const audio = new Audio(alarm.audioUrl);
    audio.play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date().toISOString().slice(0, 16);
      alarms.forEach((alarm) => {
        if (alarm.time === currentDateTime) {
          playAlarm(alarm);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="flex">
      

      {/* left Side: Alarm Setup Form */}
      <div className="w-2/3 p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Set Alarm</h2>
        <div className="flex space-x-2 mb-2">
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 border rounded-md">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select value={day} onChange={(e) => setDay(e.target.value)} className="p-2 border rounded-md">
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded-md">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={String(2024 + i)}>
                {2024 + i}
              </option>
            ))}
          </select>
        </div>

        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mb-2 p-2 border rounded-md" />

        <select value={mood} onChange={(e) => setMood(e.target.value)} className="mb-2 p-2 border rounded-md">
          <option value="Happy">Happy</option>
          <option value="Calm">Calm</option>
          <option value="Energetic">Energetic</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Custom">Custom</option>
        </select>
        {mood === "Custom" && <input type="text" placeholder="Enter custom mood" value={customMood} onChange={(e) => setCustomMood(e.target.value)} className="mb-2 p-2 border rounded-md" />}

        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="mb-2 p-2 border rounded-md">
          <option value="Pop">Pop</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Rock">Rock</option>
          <option value="Custom">Custom</option>
        </select>
        {genre === "Custom" && <input type="text" placeholder="Enter custom genre" value={customGenre} onChange={(e) => setCustomGenre(e.target.value)} className="mb-2 p-2 border rounded-md" />}

        <button onClick={handleSetAlarm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Set Alarm
        </button>
      </div>

      {/* right Side: Display Alarms */}
      <div className="w-2/3 p-5 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4"> Current Alarms: </h2>
        {alarms.map((alarm) => (
          <div key={alarm.id} className="mb-4 p-4 bg-gray-200 rounded-lg shadow-md">
            <p>Alarm {alarm.id}: {alarm.time}</p>
            <p>Mood: {alarm.mood}</p>
            <p>Genre: {alarm.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmSetup;

