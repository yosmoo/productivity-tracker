import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import ProgressCard from "./components/ProgressCard";
import TaskList from "./components/TaskList";
import WeeklySummary from "./components/WeeklySummary";

const DAYS = [
    { key: "MONDAY", short: "ПН", label: "Понедельник" },
    { key: "TUESDAY", short: "ВТ", label: "Вторник" },
    { key: "WEDNESDAY", short: "СР", label: "Среда" },
    { key: "THURSDAY", short: "ЧТ", label: "Четверг" },
    { key: "FRIDAY", short: "ПТ", label: "Пятница" },
    { key: "SATURDAY", short: "СБ", label: "Суббота" },
    { key: "SUNDAY", short: "ВС", label: "Воскресенье" },
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedDay, setSelectedDay] = useState("MONDAY");
    const [showWeeklySummary, setShowWeeklySummary] = useState(false);

    const [completed, setCompleted] = useState({
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/tasks")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Не удалось загрузить задачи");
                }

                return response.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
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

    const weeklyPercent =
        weeklyTotal > 0
            ? Math.round((weeklyCompleted / weeklyTotal) * 100)
            : 0;

    const toggleTask = (taskId) => {
        setCompleted((current) => {
            const currentDay = current[selectedDay] ?? [];
            const isCompleted = currentDay.includes(taskId);

            return {
                ...current,
                [selectedDay]: isCompleted
                    ? currentDay.filter((id) => id !== taskId)
                    : [...currentDay, taskId],
            };
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center">
                <div className="text-lg text-neutral-600">
                    Загрузка задач...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-lg text-red-600">
                        Ошибка: {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-white"
                    >
                        Попробовать снова
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f5f3] px-4 py-6 text-neutral-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Header
                    onWeeklyClick={() => setShowWeeklySummary(true)}
                />

                {showWeeklySummary ? (
                    <WeeklySummary
                        completed={weeklyCompleted}
                        total={weeklyTotal}
                        percent={weeklyPercent}
                        onBack={() => setShowWeeklySummary(false)}
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
                            Отмечай задачи каждый день — в воскресенье увидишь результат недели.
                        </footer>
                    </>
                )}
            </div>
        </main>
    );
}

export default App;