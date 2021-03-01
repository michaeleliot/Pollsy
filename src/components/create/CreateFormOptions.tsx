import { useState } from 'react';

export default function CreateFormOptions({ register }: { register: any }) {
  const option_key = (option_number: number) =>
    `options[${option_number}].description`;
  const option_html = (option_number: number) => (
    <div key={option_key(option_number)}>
      <input
        name={option_key(option_number)}
        ref={register}
        placeholder="Option"
      />
      <button
        type="button"
        onClick={() => {
          if (option_number !== 0) {
            updateOptions((options) =>
              options.filter((t) => t.key !== option_key(option_number)),
            );
          }
        }}
      >
        {` `}X{` `}
      </button>
    </div>
  );
  const [options, updateOptions] = useState([option_html(0)]);
  const [totalOptions, updateTotalOptions] = useState(1);

  return (
    <div>
      {options}
      <button
        type="button"
        onClick={() => {
          updateOptions([...options, option_html(totalOptions)]);
          updateTotalOptions(totalOptions + 1);
        }}
      >
        {` `}
        Add an option{` `}
      </button>
    </div>
  );
}
