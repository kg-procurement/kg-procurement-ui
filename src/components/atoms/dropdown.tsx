import { useState } from 'react';
import { CaretDown, CaretUp, X } from '@phosphor-icons/react';

interface DropdownProps {
    options: string[];
    label: string;
    onOptionSelect: (option: string | null) => void;
}

export default function Dropdown({ options, label, onOptionSelect }: DropdownProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleOptionClick(option: string) {
        setSearchTerm('');
        setSelectedOption(option);
        onOptionSelect(option);
        setIsOpen(false);
    }

    function handleResetSelection() {
        setSelectedOption(null);
        onOptionSelect(null);
    }

    return (
        <div className="relative w-1/2">
            <div className="dropdown">
                <div className="relative">
                    <input
                        type="text"
                        value={selectedOption || ''}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        placeholder={label}
                        readOnly
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
                    </span>
                    <button 
                        onClick={handleResetSelection} 
                        aria-label="Reset selection"
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <X size={20} />
                    </button>
                    {isOpen && (
                        <ul role="listbox" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                            <li>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full p-2 border-b focus:outline-none"
                                />
                            </li>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                    >
                                        {option}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">No options found</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
