import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  completedIds,
  onToggle,
}) {
	return (
		<section>
			<div className="mb-3 flex items-center justify-between px-1">
				<h2 className="font-semibold tracking-tight">
					Задачи
				</h2>
				<span className="text-sm text-neutral-400">
					{completedIds.length}/{tasks.length}
				</span>
			</div>

			<div className="space-y-2">
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						completed={completedIds.includes(task.id)}
						onToggle={() => onToggle(task.id)}
					/>
				))}
			</div>
		</section>
  	);
}