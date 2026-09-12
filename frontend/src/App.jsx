import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import ProgressCard from "./components/ProgressCard";
import TaskList from "./components/TaskList";
import WeeklySummary from "./components/WeeklySummary";

const API_URL = "http://localhost:8080/api";

const DAYS = [
    { key: "MONDAY", short: "MON", label: "Monday" },
    { key: "TUESDAY", short: "TUE", label: "Tuesday" },
    { key: "WEDNESDAY", short: "WED", label: "Wednesday" },
    { key: "THURSDAY", short: "THU", label: "Thursday" },
    { key: "FRIDAY", short: "FRI", label: "Friday" },
    { key: "SATURDAY", short: "SAT", label: "Saturday" },
    { key: "SUNDAY", short: "SUN", label: "Sunday" },
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState("MONDAY");
    const [showWeeklySummary, setShowWeeklySummary] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [weeklyPercent, setWeeklyPercent] = useState(0);

    const [completed, setCompleted] = useState({
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
    });

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [
                tasksResponse,
                completionsResponse,
                statisticsResponse,
            ] = await Promise.all([
                fetch(`${API_URL}/tasks`),
                fetch(`${API_URL}/complete`),
                fetch(`${API_URL}/statistics/week`),
            ]);

            if (!tasksResponse.ok) {
                throw new Error("Failed to load tasks");
            }

            if (!completionsResponse.ok) {
                throw new Error("Failed to load completed tasks");
            }

            if (!statisticsResponse.ok) {
                throw new Error("Failed to load statistics");
            }

            const tasksData = await tasksResponse.json();
            const completionsData = await completionsResponse.json();
            const statisticsData = await statisticsResponse.json();

            setTasks(tasksData);
            setWeeklyPercent(statisticsData);

            const completedByDay = {
                MONDAY: [],
                TUESDAY: [],
                WEDNESDAY: [],
                THURSDAY: [],
                FRIDAY: [],
                SATURDAY: [],
                SUNDAY: [],
            };

            completionsData.forEach((completion) => {
                if (completedByDay[completion.dayOfWeek]) {
                    completedByDay[completion.dayOfWeek].push(
                        completion.taskId
                    );
                }
            });

            setCompleted(completedByDay);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const currentDay = DAYS.find(
        (day) => day.key === selectedDay
    );

    const completedToday = completed[selectedDay]?.length ?? 0;

    const todayPercent =
        tasks.length > 0
            ? Math.round((completedToday / tasks.length) * 100)
            : 0;

    const weeklyCompleted = useMemo(() => {
        return Object.values(completed).reduce(
            (sum, tasks) => sum + tasks.length,
            0
        );
    }, [completed]);

    const weeklyTotal = tasks.length * DAYS.length;

    const toggleTask = async (taskId) => {
        const currentDay = completed[selectedDay] ?? [];
        const isCompleted = currentDay.includes(taskId);

        try {
            setError(null);

            if (isCompleted) {
                const response = await fetch(
                    `${API_URL}/tasks/${taskId}/complete?dayOfWeek=${selectedDay}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to uncomplete the task"
                    );
                }

                setCompleted((current) => ({
                    ...current,
                    [selectedDay]: currentDay.filter(
                        (id) => id !== taskId
                    ),
                }));
            } else {
                const response = await fetch(
                    `${API_URL}/tasks/${taskId}/complete?dayOfWeek=${selectedDay}`,
                    {
                        method: "POST",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to complete the task"
                    );
                }

                setCompleted((current) => ({
                    ...current,
                    [selectedDay]: [
                        ...currentDay,
                        taskId,
                    ],
                }));
            }

            const statisticsResponse = await fetch(
                `${API_URL}/statistics/week`
            );

            if (statisticsResponse.ok) {
                const statisticsData =
                    await statisticsResponse.json();

                setWeeklyPercent(statisticsData);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const resetWeek = async () => {
        try {
            setResetting(true);
            setError(null);

            const response = await fetch(
                `${API_URL}/statistics/reset`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to reset the week"
                );
            }

            await loadData();

            setShowResetConfirm(false);
            setShowWeeklySummary(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setResetting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
                <div className="text-lg text-neutral-600">
                    Loading tasks...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-lg text-red-600">
                        Error: {error}
                    </p>

                    <button
                        onClick={() => loadData()}
                        className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-white"
                    >
                        Try again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f5f3] px-4 py-6 text-neutral-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <Header
                    onWeeklyClick={() =>
                        setShowWeeklySummary(true)
                    }
                    onResetWeek={() =>
                        setShowResetConfirm(true)
                    }
                />

                {showResetConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                            <h2 className="text-xl font-semibold text-neutral-950">
                                Are you sure you want to reset the week?
                            </h2>

                            <p className="mt-2 text-sm text-neutral-500">
                                All completed tasks for the
                                week will be deleted.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() =>
                                        setShowResetConfirm(false)
                                    }
                                    disabled={resetting}
                                    className="flex-1 rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={resetWeek}
                                    disabled={resetting}
                                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white"
                                >
                                    {resetting
                                        ? "Resetting..."
                                        : "Yes, reset"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showWeeklySummary ? (
                    <WeeklySummary
                        completed={weeklyCompleted}
                        total={weeklyTotal}
                        percent={weeklyPercent}
                        onBack={() =>
                            setShowWeeklySummary(false)
                        }
                    />
                ) : (
                    <>
                        <div className="mt-8">
                            <DaySelector
                                days={DAYS}
                                selectedDay={selectedDay}
                                onSelect={setSelectedDay}
                            />
                        </div>

                        <section className="mt-6">
                            <div className="space-y-6">
                                <ProgressCard
                                    dayLabel={currentDay.label}
                                    completed={completedToday}
                                    total={tasks.length}
                                    percent={todayPercent}
                                />

                                <TaskList
                                    tasks={tasks}
                                    completedIds={
                                        completed[selectedDay] ?? []
                                    }
                                    onToggle={toggleTask}
                                />
                            </div>
                        </section>

                        <footer className="py-8 text-center text-sm text-neutral-400">
                            Check off your tasks every day — see your weekly progress on Sunday.
                        </footer>
                    </>
                )}
            </div>
        </main>
    );
}

export default App;