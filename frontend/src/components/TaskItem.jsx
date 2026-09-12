export default function TaskItem({
  task,
  completed,
  onToggle,
}) {
    return (
        <button
            onClick={onToggle}
            className="
                group flex w-full items-center gap-4
                rounded-2xl
                border border-neutral-200
                bg-white
                p-4
                text-left
                shadow-sm
                transition

                hover:-translate-y-0.5
                hover:border-neutral-300
                hover:shadow-md

                focus:outline-none
                focus:ring-2
                focus:ring-neutral-300
            "
        >

            <span
                className={`
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-full
                border-2
                text-sm
                font-bold
                transition

                ${
                    completed
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-300 text-transparent group-hover:border-neutral-500"
                }
                `}
            >
                ✓
            </span>

            <span
                className={`
                flex-1 text-sm font-medium transition sm:text-base
                ${
                    completed
                    ? "text-neutral-400 line-through"
                    : "text-neutral-800"
                }
                `}
            >
                {task.title}
            </span>

            <span className="
                text-neutral-300
                transition
                group-hover:translate-x-0.5
                group-hover:text-neutral-500
            ">
                →
            </span>
        </button>
    );
}