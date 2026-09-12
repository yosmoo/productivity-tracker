const CATS = [
    {
        image: "/cats/cat1.jpg",
        title: "The Week Is Just Beginning",
        text: "That's okay. The important thing is to try again.",
    },
    {
        image: "/cats/cat2.jpg",
        title: "Already Better",
        text: "You've taken a few steps. Keep it up.",
    },
    {
        image: "/cats/cat3.jpg",
        title: "A Good Week",
        text: "You've done a pretty good job with your tasks.",
    },
    {
        image: "/cats/cat4.jpg",
        title: "Great Result",
        text: "You're really keeping your rhythm.",
    },
    {
        image: "/cats/cat5.jpg",
        title: "Wow, So Productive!",
        text: "You've completed most of your tasks. Keep it up!",
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