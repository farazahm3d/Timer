import { useEffect, useState } from "react";
export default function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputHours, setInputHours] = useState(""); // Store user input
    const [inputMins, setInputMins] = useState("");
    const [inputSecs, setInputSecs] = useState("");

    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [milliseconds, setMilliseconds] = useState("00");

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 10);
            }, 10);

        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        const hrs = Math.floor(time / 3600000);
        const mins = Math.floor((time % 3600000) / 60000);
        const secs = Math.floor((time % 60000) / 1000);
        const millis = Math.floor((time % 1000) / 10);

        setHours(String(hrs).padStart(2, "0"));
        setMinutes(String(mins).padStart(2, "0"));
        setSeconds(String(secs).padStart(2, "0"));
        setMilliseconds(String(millis).padStart(2, "0"));
    }, [time]);

    // Function to update time from input
    const handleSetTime = () => {
        const newTime = parseInt(inputHours * 60 * 60000, 10) + parseInt(inputMins * 60000, 10) + parseInt(inputSecs * 1000, 10);
        console.log(inputHours);
        console.log(inputMins);
        console.log(inputSecs);
        if (!isNaN(newTime) && newTime >= 0) {
            setTime(newTime);
        }
    };
    const fieldReset = () => {
        setInputHours(0);
        setInputMins(0);
        setInputSecs(0);
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-4xl font-bold mb-4">
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>:<span>{milliseconds}</span>
            </div>

            {/* Input Box to Set Custom Time */}
            <div className="mb-4">
                <input
                    type="number"
                    placeholder="Enter time in hours"
                    value={inputHours}
                    onChange={(e) => setInputHours(e.target.value)}
                    className="p-2 border rounded text-lg"
                />
                <input
                    type="number"
                    placeholder="Enter time in mins"
                    value={inputMins}
                    onChange={(e) => setInputMins(e.target.value)}
                    className="p-2 border rounded text-lg"
                />
                <input
                    type="number"
                    placeholder="Enter time in secs"
                    value={inputSecs}
                    onChange={(e) => setInputSecs(e.target.value)}
                    className="p-2 border rounded text-lg"
                />
                <button
                    onClick={handleSetTime}
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Set Time
                </button>
            </div>

            <div className="space-x-4">
                <button
                    onClick={() => {
                        setIsRunning(true);
                        if (time === 0) {
                            handleSetTime();
                        }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Start
                </button>
                <button
                    onClick={() => setIsRunning(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Stop
                </button>
                <button
                    onClick={() => { setTime(0); setIsRunning(false); fieldReset(); }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}