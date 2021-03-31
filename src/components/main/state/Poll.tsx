import { useMutation } from '@apollo/client';
import { useState } from 'react';
import PollView from '../view/PollView';
import { ANSWER_POLL, DELETE_POLL } from '../../graphql/queries';
import { deletedVar } from '../../../../lib/apolloClient';

export default function PollState({ poll }: { poll: any }) {
  const [answerPoll] = useMutation(ANSWER_POLL);
  const [deletePoll] = useMutation(DELETE_POLL);

  const [options, setOptions] = useState(poll.options);

  const onDelete = () => {
    deletePoll({
      variables: {
        pollId: poll.id,
      },
    });
    deletedVar({
      ...deletedVar(),
      [poll.id]: true,
    });
  };
  const onAnswer = (optionId: string) => {
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
    <PollView
      poll={poll}
      options={options}
      onDelete={onDelete}
      onAnswer={onAnswer}
    />
  );
}
