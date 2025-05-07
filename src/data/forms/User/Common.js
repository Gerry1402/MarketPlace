const adultAge = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
};

export const common_inputs = {
    name: {
        label: 'Name',
        control: {
            type: 'text',
            placeholder: 'Name',
            name: 'name',
            defaultValue: '',
        },
        feedback: 'Write a name',
    },

    surname: {
        label: 'Surname',
        control: {
            type: 'text',
            placeholder: 'Sur Name',
            name: 'surname',
            defaultValue: '',
        },
        feedback: 'Write one or two surnames',
    },

    display_name: {
        label: 'Username',
        group: '@',
        control: {
            type: 'text',
            placeholder: 'username',
            name: 'display_name',
            defaultValue: '',
        },
        feedback: 'Try another username',
    },

    email: {
        label: 'Email',
        control: {
            type: 'email',
            placeholder: 'example@email.com',
            name: 'email',
            defaultValue: '',
        },
        feedback: 'Write a valid email',
    },

    password: {
        label: 'Password',
        control: {
            type: 'password',
            name: 'password',
            minLength: 8,
            defaultValue: '',
        },
        feedback: 'Write a minimum of 8 characters',
    },

    birthdate: {
        label: 'Birthdate',
        control: {
            type: 'date',
            name: 'birthdate',
            defaultValue: adultAge(),
            max: adultAge(),
        },
        feedback: 'Write a valid phone number',
    },
    phone: {
        label: 'Phone Number',
        control: {
            type: 'tel',
            name: 'phone',
            defaultValue: '',
        },
        feedback: 'Write a valid phone number',
    },
};
