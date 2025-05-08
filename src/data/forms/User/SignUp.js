import { common_inputs } from './Common';
import { extractDefaultValuesInputs } from '../Extra';

export const inputs = [
    {
        ...common_inputs.name,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.surname,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.birthdate,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.display_name,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.email,
        size: { xs: 12, md: 6, lg: 4 },
    },
    {
        ...common_inputs.password,
        size: { xs: 12, md: 6, lg: 4 },
    },
];

export const defaultValues = {
    ...extractDefaultValuesInputs(inputs),
};
