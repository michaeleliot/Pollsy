import { useState } from 'react';

export default function CreateFormOptions({ register }: { register: any }) {
  const option_key = (option_number: number) =>
    `options[${option_number}].description`;
  const option_html = (option_number: number) => (
    <div className="flex my-2 flex-row gap-2" key={option_key(option_number)}>
      <input
        name={option_key(option_number)}
        className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
    <div className="gap-2">
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
