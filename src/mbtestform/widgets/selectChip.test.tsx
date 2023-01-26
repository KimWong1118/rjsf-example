import React from 'react';
import { render } from '@testing-library/react';
import { CustomSelectChip } from './selectChip';

const mock_data = {
    value: ['option1', 'option3'],
    options: {
        enumOptions: [{
            label: 'option1',
            value: 'option1',
        }, {
            label: 'option2',
            value: 'option2',
        }, {
            label: 'option3',
            value: 'option3',
        }],
    },
    onChange: jest.fn(),
};

describe('<CustomSelectChip />', () => {
    it('Renders CustomSelectChip', () => {
        const {
            queryByText,
        } = render(
            <CustomSelectChip {...mock_data} />,
        );

        expect(queryByText(/option1/)).toBeInTheDocument();
        expect(queryByText(/option2/)).not.toBeInTheDocument();
        expect(queryByText(/option3/)).toBeInTheDocument();
    });
});
