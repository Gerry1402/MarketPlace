import { useState } from 'react';

const useToggle = (initValue = false) => {
    const [value, setValue] = useState(initValue);
    return [
        value,
        {
            set: setValue,
            toggle: e => {
                e.preventDefault();
                setValue(flag => !flag);
            },
        },
    ];
};

export default useToggle;
