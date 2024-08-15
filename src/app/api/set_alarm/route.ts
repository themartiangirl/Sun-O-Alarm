import { NextResponse } from "next/server";

type AlarmRequest = {
  time: string;
  userId?: string;
};

let alarmTimes: { [key: string]: string } = {}; // In-memory store for simplicity, save time in database in the future.

export async function POST(req: Request) {
  try {
    const body: AlarmRequest = await req.json();

    const { time, userId } = body;

    if (!time) {
      return NextResponse.json({ error: 'Time is required' }, { status: 400 });
    }

    // Store the alarm time, optionally by userId
    if (userId) {
      alarmTimes[userId] = time;
    } else {
      alarmTimes['default'] = time; // Default for single user case
    }

    return NextResponse.json({ message: 'Alarm time set successfully', time }, { status: 200 });
  } catch (error) {
    console.error("Error setting alarm:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
