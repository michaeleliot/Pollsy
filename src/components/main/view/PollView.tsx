import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ANSWER_POLL } from '../../graphql/queries';

export default function PollView({ poll }: { poll: any }) {
  const [answerPoll, { data, error = { graphQLErrors: [] } }] = useMutation(
    ANSWER_POLL,
  );
  const [options, setOptions] = useState(poll.options);
  const onSubmit = (optionId: string) => {
    answerPoll({
      variables: {
        optionId,
        pollId: poll.id,
      },
    }).catch((err) => console.log(err));
    const tempOptions = options.slice();
    const oldSelection = tempOptions.findIndex(
      (option: any) => option.selected,
    );
    const newSelection = tempOptions.findIndex(
      (option: any) => option.id === optionId,
    );
    if (oldSelection !== -1) {
      tempOptions[oldSelection] = {
        ...tempOptions[oldSelection],
        selected: false,
        votes: tempOptions[oldSelection].votes - 1,
      };
    }
    tempOptions[newSelection] = {
      ...tempOptions[newSelection],
      selected: true,
      votes: tempOptions[newSelection].votes + 1,
    };
    setOptions(tempOptions);
  };

  return (
    <div
      key={`poll-${poll.id}`}
      className="p-5 card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
    >
      {`${poll.title}: ${poll.description}`}
      <form>
        {options.map((option: any) => (
          <div key={`option-${option.id}`}>
            <input
              name="optionId"
              id={option.id}
              key={option.id}
              type="radio"
              value={option.id}
              defaultChecked={option.selected}
              onClick={() => onSubmit(option.id)}
            />
            <label
              htmlFor={option.id}
            >{`${option.description} - Votes: ${option.votes}`}</label>
          </div>
        ))}
      </form>
    </div>
  );
}
