import { useState } from "react";

export function useToggle(initial = false) {
    const [value, setValue] = useState(initial);

    const toggle = () => setValue(v => !v);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return { value, toggle, setTrue, setFalse };
}