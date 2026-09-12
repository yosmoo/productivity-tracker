const CATS = [
    {
        image: "/cats/cat1.jpg",
        title: "Неделя только начинается",
        text: "Ничего страшного. Главное — попробовать снова.",
    },
    {
        image: "/cats/cat2.jpg",
        title: "Уже лучше",
        text: "Ты сделал несколько шагов. Продолжай в том же духе.",
    },
    {
        image: "/cats/cat3.jpg",
        title: "Хорошая неделя",
        text: "Ты неплохо справился со своими задачами.",
    },
    {
        image: "/cats/cat4.jpg",
        title: "Отличный результат",
        text: "Ты действительно держишь свой ритм.",
    },
    {
        image: "/cats/cat5.jpg",
        title: "Вау, продуктивность!",
        text: "Ты выполнил большую часть задач. Так держать!",
    },
];

export function getCatByPercent(percent) {
    let catIndex;

    if (percent < 20) {
        catIndex = 0;
    } else if (percent < 40) {
        catIndex = 1;
    } else if (percent < 60) {
        catIndex = 2;
    } else if (percent < 80) {
        catIndex = 3;
    } else {
        catIndex = 4;
    }

    return CATS[catIndex];
}