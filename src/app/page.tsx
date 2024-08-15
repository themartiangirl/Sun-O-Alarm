import Section from "./components/Section";
import Markdown from 'react-markdown';
import AlarmSetup from './components/AlarmSetup';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AlarmSetup />
    </div>
  );
}
