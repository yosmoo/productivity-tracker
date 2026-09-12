import { getCatByPercent } from "../utils/catProgress";

export default function WeeklySummary({
	completed,
	total,
	percent,
	onBack,
}) {
	const currentCat = getCatByPercent(percent);

	return (
		<section className="mt-8">
			<div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
				<div className="p-6 sm:p-8">
					<button
						onClick={onBack}
						className="
							mb-8
							rounded-xl
							border border-neutral-200
							bg-neutral-50
							px-3 py-2
							text-sm
							font-medium
							text-neutral-600
							transition
							hover:bg-neutral-100
						"
					>
						← Вернуться к задачам
					</button>

					<div className="text-center">
						<p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
							Итоги недели
						</p>

						<h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
							{currentCat.title}
						</h2>

						<p className="mx-auto mt-2 max-w-md text-neutral-500">
							{currentCat.text}
						</p>
					</div>

					<div className="mt-8 flex justify-center">
						<div className="flex h-64 w-64 items-center justify-center rounded-3xl bg-[#f5f5f3] p-6 sm:h-72 sm:w-72">
							<img
								src={currentCat.image}
								alt="Кот"
								className="h-full w-full object-contain"
							/>
						</div>
					</div>

					<div className="mt-8">
						<div className="flex items-end justify-between">
							<div>
								<p className="text-sm text-neutral-400">
									Выполнено задач
								</p>

								<p className="mt-1 text-3xl font-bold">
									{completed}
									<span className="text-lg font-medium text-neutral-400">
										{" "}
										/ {total}
									</span>
								</p>
							</div>

							<p className="text-3xl font-bold">
								{percent}%
							</p>
						</div>

						<div className="mt-4 h-3 overflow-hidden rounded-full bg-neutral-100">
							<div
								className="h-full rounded-full bg-neutral-950 transition-all duration-500"
								style={{ width: `${percent}%` }}
							/>
						</div>
					</div>
				</div>
			</div>

			<footer className="py-8 text-center text-sm text-neutral-400">
				Новая неделя — новый результат.
			</footer>

		</section>
	);
}