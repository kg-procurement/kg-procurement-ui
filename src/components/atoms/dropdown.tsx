import { useState } from 'react';
import { CaretDown, CaretUp, X } from '@phosphor-icons/react';

interface DropdownProps {
    readonly options: string[];
    readonly label: string;
    readonly onOptionSelect: (option: string | null) => void;
}

export default function Dropdown({ options, label, onOptionSelect }: DropdownProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleOptionClick(option: string) {
        console.log('Selected option:', option);
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
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen} // Add aria-expanded for accessibility
                    >
                        {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
                    </button>

                    <button 
                        onClick={handleResetSelection} 
                        aria-label="Reset selection"
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <X size={20} />
                    </button>
                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                            {/* Search bar for filtering options */}
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="w-full p-2 border-b focus:outline-none"
                            />

                            {/* Native select element */}
                            <select
                                className="w-full p-2 border rounded focus:outline-none"
                                size={Math.min(filteredOptions.length, 5)} // Limit the size of the dropdown to 5
                                onChange={(e) => handleOptionClick(e.target.value)}
                            >
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No options found</option>
                                )}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
