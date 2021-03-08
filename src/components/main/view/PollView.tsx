import { useForm } from 'react-hook-form';
import { Option, Poll, Answer } from '@prisma/client';
import { useMutation } from '@apollo/client';
import { ANSWER_POLL } from '../../graphql/queries';

export default function PollView({ poll }: { poll: Poll }) {
  const { register, handleSubmit } = useForm();
  const [answerPoll, { data, error = { graphQLErrors: [] } }] = useMutation(
    ANSWER_POLL,
  );
  const onSubmit = (selection: { optionId: string }) => {
    answerPoll({
      variables: {
        optionId: parseInt(selection.optionId, 10),
        pollId: poll.id,
      },
    }).catch((err) => console.log(err));
  };
  let userAnswer: Answer | undefined;
  if (poll.Answer.length) {
    const { Answer: answerArray } = poll;
    const userAnswerIndex = 0;
    userAnswer = answerArray[userAnswerIndex];
  }
  return (
    <div key={`poll-${poll.id}`}>
      {`${poll.title}: ${poll.description}`}
      <form onSubmit={handleSubmit(onSubmit)}>
        {poll.options.map((option: Option) => (
          <div key={`option-${option.id}`}>
            <input
              name="optionId"
              id={option.id.toString()}
              key={option.id}
              ref={register({ required: true })}
              type="radio"
              value={option.id}
              defaultChecked={userAnswer && userAnswer.optionId === option.id}
            />
            <label
              htmlFor={option.id.toString()}
            >{`${option.description} - Votes: ${option.votes}`}</label>
          </div>
        ))}
        <input type="submit" />
      </form>
      <pre>
        Bad:{` `}
        {error.graphQLErrors.map(
          ({ message }: { message: string }, i: number) => (
            <span>{message}</span>
          ),
        )}
      </pre>
    </div>
  );
}
