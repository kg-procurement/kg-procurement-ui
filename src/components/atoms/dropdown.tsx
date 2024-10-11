import React from 'react';

interface DropdownProps {
    options: string[];
    label: string;
    onOptionSelect: (option: string | null) => void;
}

export default function Dropdown({ options, label, onOptionSelect }: DropdownProps) {
    return <div></div>;
}
