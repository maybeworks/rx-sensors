import { interval } from 'rxjs';
import { map } from "rxjs/operators";

const useSensor = () => {
    return interval(Math.floor(Math.random() * (2000 - 100 + 1) + 100))
        .pipe(map(()=> Math.floor(Math.random() * 100) + 30))
};

export default useSensor;