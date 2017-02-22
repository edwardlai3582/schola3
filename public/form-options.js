var formOptions = {
    states: [
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ],
    genders: [
        {
            label: 'Male',
            value: 'male'
        },
        {
            label: 'Female',
            value: 'female'
        }
    ]
};
var formInputItems = {
    'fistName': {
        label: 'First Name',
        type: 'text'
    },
    'lastName': {
        label: 'Last Name',
        type: 'text'
    },
    'gender': {
        label: 'Gender',
        type: 'radio',
        options: formOptions.genders
    },
    'birthday': {
        label: 'Birthday',
        type: 'date'
    },
    'phoneNumber': {
        label: 'Phone #',
        type: 'number',
        isArray: true
    },
    'address.street1': {
        label: 'Street 1',
        type: 'text'
    },
    'address.street2': {
        label: 'Street 2',
        type: 'text'
    },
    'address.city': {
        label: 'City',
        type: 'text'
    },
    'address.state': {
        label: 'State',
        type: 'select',
        options: formOptions.states
    },
    'address.zipCode': {
        label: 'Zip Code',
        type: 'text'
    }
};
