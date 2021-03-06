import Link from 'next/link';
import { Poll, Option } from '@prisma/client';

export default function PollView({
  poll,
  options,
  onDelete,
  onAnswer,
}: {
  poll: Poll;
  options: Option[];
  onDelete: any;
  onAnswer: any;
}) {
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
                onClick={() => onAnswer(option.id)}
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
      <button type="button" onClick={() => onDelete()}>
        Delete Poll
      </button>
    </div>
  );
}
