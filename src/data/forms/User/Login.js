import { common_inputs } from './Common';
import { extractDefaultValuesInputs } from '../Extra';

export const inputs = [
    {
        ...common_inputs.email,
        size: { xs: 12, md: 6, lg: 6 },
    },
    {
        ...common_inputs.password,
        size: { xs: 12, md: 6, lg: 6 },
    },
];

export const defaultValues = extractDefaultValuesInputs(inputs);
