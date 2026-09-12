import CatProgress from "./CatProgress";

export default function ProgressCard({
  dayLabel,
  completed,
  total,
  percent,
}) {
    return (
        <section className="rounded-3xl bg-neutral-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-sm font-medium text-neutral-400">
                    Сегодня — {dayLabel.toLowerCase()}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Хорошее начало.
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
                    Выполни задачи и поддерживай свой ритм. Не
                    обязательно сделать всё идеально — главное,
                    двигаться вперёд.
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                <div>
                    <span className="text-6xl font-bold tracking-tighter sm:text-7xl">
                        {percent}%
                    </span>

                    <p className="mt-1 text-right text-sm text-neutral-500">
                        {completed} из {total}
                    </p>
                </div>

                <CatProgress percent={percent} />
            </div>
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-neutral-800">
            <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${percent}%` }}
            />
        </div>
        </section>
    );
}