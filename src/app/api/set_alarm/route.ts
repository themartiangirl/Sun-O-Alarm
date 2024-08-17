
// import { NextResponse } from "next/server";
// import cron from "node-cron";  
// import axios from 'axios';

// type AlarmRequest = {
//   time: string;
//   userId?: string;
//   recurrence?: string; // Recurrence pattern (e.g., '0 8 * * *' for daily at 8 AM)
//   mood?: string;
//   genre?: string;
// };

// let alarmTimes: { [key: string]: any } = {}; // In-memory store for simplicity

// //api bb
// async function generateAudio(mood: string, genre: string): Promise<string> {
//   try {
//     const response = await axios.post('/api/custom_generate', {
//       prompt: `A ${mood} ${genre} track for an alarm`,
//       tags: `${mood}, ${genre}`,
//       title: `Alarm_${mood}_${genre}`,
//       make_instrumental: false,
//       wait_audio: true,
//       isAlarmTone: true,
//     });

//     console.log("Generated Audio Response:", response.data);  // Log the response

//     if (!response.data.audioURL) {
//       console.error("Audio URL is missing in the response");
//       throw new Error("Audio URL is missing");
//     }

//     //response contains the URL in `audioURL` ? perphas
//     return response.data.audioURL;
//   } catch (error) {
//     console.error("Error generating audio:", error);
//     throw new Error("Failed to generate audio");
//   }
// }


// // Function to play alarm (stubbed, to be replaced with real implementation)
// function playAlarm(audioUrl: string) {
//   const audio = new Audio(audioUrl);
//   audio.play();
// }

// export async function POST(req: Request) {
//   try {
//     const body: AlarmRequest = await req.json();
//     const { time, userId = 'default', recurrence, mood = 'Happy', genre = 'Pop' } = body;

//     if (!time) {
//       return NextResponse.json({ error: 'Time is required' }, { status: 400 });
//     }

//     // Generate the audio URL for the alarm based on mood and genre
//     const audioUrl = await generateAudio(mood, genre);

//     const newAlarm = { time, audioUrl, recurrence };

//     // Store the alarm time and audio, optionally by userId
//     alarmTimes[userId] = newAlarm;

//     // Schedule recurring alarms if a recurrence pattern is provided
//     if (recurrence) {
//       cron.schedule(recurrence, () => playAlarm(audioUrl), {
//         scheduled: true,
//         timezone: "America/New_York",  // Set the timezone according to your needs
//       });
//     }

//     return NextResponse.json({ message: 'Alarm time set successfully', newAlarm }, { status: 200 });
//   } catch (error) {
//     console.error("Error setting alarm:", error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function PATCH(req: Request) {
//   try {
//     const body: { userId: string, snoozeTime: number } = await req.json();
//     const { userId = 'default', snoozeTime } = body;

//     const alarm = alarmTimes[userId];
//     if (!alarm) {
//       return NextResponse.json({ error: 'No alarm found to snooze' }, { status: 404 });
//     }

//     // Snooze the alarm by adding snoozeTime (in minutes) to the current alarm time
//     const newTime = new Date(new Date(alarm.time).getTime() + snoozeTime * 60000).toISOString();
//     alarm.time = newTime;
//     alarmTimes[userId] = alarm;

//     return NextResponse.json({ message: 'Alarm snoozed successfully', alarm }, { status: 200 });
//   } catch (error) {
//     console.error("Error snoozing alarm:", error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const body: { userId: string } = await req.json();
//     const { userId = 'default' } = body;

//     if (alarmTimes[userId]) {
//       delete alarmTimes[userId];
//       return NextResponse.json({ message: 'Alarm stopped successfully' }, { status: 200 });
//     } else {
//       return NextResponse.json({ error: 'No alarm found to stop' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Error stopping alarm:", error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { time, mood, genre } = data;

    // saving the alarm data in simple in-memory store for now.
    const alarmData = { time, mood, genre };
    
    // Log the alarm data for debugging
    console.log('Alarm Data:', alarmData);

    
    //returning the alarm data for demonstration purposes.
    return NextResponse.json({ message: 'Alarm set successfully!', data: alarmData });
  } catch (error) {
    // Explicitly cast the error to an instance of Error to access its message
    if (error instanceof Error) {
      console.error('Error setting alarm:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
