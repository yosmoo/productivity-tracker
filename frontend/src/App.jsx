import { useMemo, useState } from "react";

import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import ProgressCard from "./components/ProgressCard";
import TaskList from "./components/TaskList";
import WeeklySummary from "./components/WeeklySummary";

const TASKS = [
	{ id: 1, title: "Заправить кровать" },
	{ id: 2, title: "Выпить стакан воды" },
	{ id: 3, title: "Сделать зарядку 20 минут" },
	{ id: 4, title: "Прочитать 30 минут" },
	{ id: 5, title: "Позаниматься учёбой" },
	{ id: 6, title: "Убраться в комнате" },
	{ id: 7, title: "Лечь спать до 23:00" },
];

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
	const [selectedDay, setSelectedDay] = useState("MONDAY");
	const [showWeeklySummary, setShowWeeklySummary] = useState(false);

	const [completed, setCompleted] = useState({
		MONDAY: [1, 2, 4],
		TUESDAY: [],
		WEDNESDAY: [],
		THURSDAY: [],
		FRIDAY: [],
		SATURDAY: [],
		SUNDAY: [],
	});

	const currentDay = DAYS.find(
		(day) => day.key === selectedDay
	);

	const completedToday = completed[selectedDay]?.length ?? 0;

	const todayPercent = Math.round(
		(completedToday / TASKS.length) * 100
	);

	const weeklyCompleted = useMemo(() => {
		return Object.values(completed).reduce(
			(sum, tasks) => sum + tasks.length,
			0
		);
	}, [completed]);

	const weeklyTotal = TASKS.length * DAYS.length;

	const weeklyPercent = Math.round(
		(weeklyCompleted / weeklyTotal) * 100
	);

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
									total={TASKS.length}
									percent={todayPercent}
								/>

								<TaskList
									tasks={TASKS}
									completedIds={completed[selectedDay] ?? []}
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