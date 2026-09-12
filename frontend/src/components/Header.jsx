export default function Header({ onWeeklyClick, onResetWeek }) {
    return (
        <header className="flex items-start justify-between gap-4">
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-sm font-bold text-white">
                        ✓
                    </div>

                    <span className="text-sm font-semibold tracking-tight text-neutral-500">
                        My Productivity
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Your day.
                </h1>

                <p className="mt-1 text-base text-neutral-500">
                    Small steps every day
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onWeeklyClick}
                    className="
                        rounded-2xl
                        border border-neutral-200
                        bg-white
                        px-4 py-3
                        text-sm
                        font-semibold
                        shadow-sm
                        transition
                        hover:border-neutral-300
                        hover:shadow-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-neutral-300
                    "
                >
                    Week summary
                </button>

                <button
                    onClick={onResetWeek}
                    className="
                        rounded-2xl
                        border border-red-200
                        bg-white
                        px-4 py-3
                        text-sm
                        font-semibold
                        text-red-600
                        shadow-sm
                        transition
                        hover:border-red-300
                        hover:bg-red-50
                        hover:shadow-md
                        focus:outline-none
                        focus:ring-2
                        focus:ring-red-200
                    "
                >
                    Reset
                </button>
            </div>
        </header>
    );
}