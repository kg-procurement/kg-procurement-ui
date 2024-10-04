import React from 'react';



const Input = React.forwardRef<HTMLInputElement>((_, ref) => {
  return <input ref={ref} />;
});

Input.displayName = 'Input';

export { Input };
