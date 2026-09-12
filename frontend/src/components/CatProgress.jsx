import { getCatByPercent } from "../utils/catProgress";

export default function CatProgress({ percent }) {
    const cat = getCatByPercent(percent);

    return (
        <img
            src={cat.image}
            alt={'Котик'}
            className="h-24 w-24 shrink-0 object-contain sm:h-28 sm:w-28"
        />
    );
    }