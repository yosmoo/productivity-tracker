export default function Header({ onWeeklyClick }) {
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
                    Твой день.
                </h1>

                <p className="mt-1 text-base text-neutral-500">
                    Маленькие действия каждый день.
                </p>
            </div>

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
                Итоги недели
            </button>
        </header>
    );
}