import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ANSWER_POLL } from '../../graphql/queries';

export default function PollView({ poll }: { poll: any }) {
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

  return (
    <div key={`poll-${poll.id}`}>
      {`${poll.title}: ${poll.description}`}
      <form onSubmit={handleSubmit(onSubmit)}>
        {poll.options.map((option: any) => (
          <div key={`option-${option.id}`}>
            <input
              name="optionId"
              id={option.id.toString()}
              key={option.id}
              ref={register({ required: true })}
              type="radio"
              value={option.id}
              defaultChecked={option.selected}
            />
            <label
              htmlFor={option.id.toString()}
            >{`${option.description} - Votes: ${option.votes}`}</label>
          </div>
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}
