import { Poll } from '@prisma/client';
import { useState } from 'react';
import PollsView from '../view/PollsView';

export default function Polls({
  data,
  fetchData,
  mine,
  hasMore,
}: {
  data: Poll[];
  mine: boolean;
  fetchData: any;
  hasMore: boolean;
}) {
  const [polls, setPolls] = useState(data);

  const removeFromList = (pollId: string) =>
    setPolls(polls.filter((poll: Poll) => poll.id !== pollId));

  return (
    <PollsView
      polls={polls}
      fetchData={fetchData}
      removeFromList={removeFromList}
      hasMore={hasMore}
      mine={mine}
    />
  );
}
