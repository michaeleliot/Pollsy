import { Poll } from '@prisma/client';
import { useReactiveVar } from '@apollo/client';
import PollsView from '../view/PollsView';
import { deletedVar } from '../../../../lib/apolloClient';

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
  const deletedItems = useReactiveVar(deletedVar);

  return (
    <PollsView
      polls={data.filter((poll) => !deletedItems[poll.id])}
      fetchData={fetchData}
      hasMore={hasMore}
      mine={mine}
    />
  );
}
