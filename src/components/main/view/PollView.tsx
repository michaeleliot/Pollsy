import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import { ANSWER_POLL, DELETE_POLL } from '../../graphql/queries';

export default function PollView({
  poll,
  mine,
  removeFromList,
}: {
  poll: any;
  mine: boolean;
  removeFromList: (pollId: string) => void;
}) {
  const [answerPoll, { data, error = { graphQLErrors: [] } }] = useMutation(
    ANSWER_POLL,
  );
  const [deletePoll] = useMutation(DELETE_POLL);
  const [options, setOptions] = useState(poll.options);
  const onPollDelete = () => {
    deletePoll({
      variables: {
        pollId: poll.id,
      },
    });
    removeFromList(poll.id);
  };
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
  const reducer = (accumulator: any, currentValue: any) =>
    accumulator + currentValue.votes;
  const sum = options.reduce(reducer, 0);
  return (
    <div
      key={`poll-${poll.id}`}
      className="p-5 card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
    >
      <Link href={`/polls/${poll.id}`}>
        {`${poll.title}: ${poll.description}`}
      </Link>
      <form>
        {options.map((option: any) => (
          <div
            key={`option-${option.id}`}
            className="relative bg-gray-100 m-1 w-100 h-100 rounded-lg z-30"
          >
            <div className="flex relative z-10">
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
            <div
              style={{
                width: option.votes ? `${(option.votes / sum) * 100}%` : 0,
              }}
              className="absolute bg-gray-300 inset-0 z-0 rounded-lg"
            />
          </div>
        ))}
      </form>
      {mine && (
        <button type="button" onClick={() => onPollDelete()}>
          Delete Poll
        </button>
      )}
    </div>
  );
}
