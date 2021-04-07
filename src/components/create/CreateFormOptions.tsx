import { useState } from 'react';

export default function CreateFormOptions({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) {
  const option_key = (option_number: number) =>
    `options[${option_number}].description`;
  const option_html = (option_number: number) => (
    <div className="flex my-2 flex-row gap-2" key={option_key(option_number)}>
      <input
        name={option_key(option_number)}
        className="appearance-none block bg-gray-200 text-gray-700 border-2 border-gray-200 focus:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        ref={register({ required: true })}
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
  const [options, updateOptions] = useState([option_html(0), option_html(1)]);
  const [totalOptions, updateTotalOptions] = useState(2);

  return (
    <div className="gap-2">
      {options}
      {errors.options ? `Cannot have blank options` : ``}
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
