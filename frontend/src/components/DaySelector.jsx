export default function DaySelector({
  days,
  selectedDay,
  onSelect,
}) {
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm">
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                    const active = day.key === selectedDay;
                        return (
                            <button
                                key={day.key}
                                onClick={() => onSelect(day.key)}
                                className={`
                                    rounded-2xl px-2 py-3 text-center transition

                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-neutral-300

                                    ${
                                    active
                                        ? "bg-neutral-950 text-white shadow-sm"
                                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                                    }
                                `}
                            >
                                <span className="block text-xs font-medium sm:text-sm">
                                    {day.short}
                                </span>

                                <span
                                    className={`mx-auto mt-2 block h-1.5 w-1.5 rounded-full
                                    ${
                                        active
                                        ? "bg-white"
                                        : "bg-neutral-200"
                                    }
                                    `}
                                />
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}