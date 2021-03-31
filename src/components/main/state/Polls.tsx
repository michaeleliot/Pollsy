import { Poll } from '@prisma/client';
import { useReactiveVar, useQuery } from '@apollo/client';
import { useState } from 'react';
import PollsView from '../view/PollsView';
import { deletedVar } from '../../../../lib/apolloClient';

import { GET_POLLS } from '../../graphql/queries';

export default function Polls({ mine }: { mine: boolean }) {
  const { loading, error, data, fetchMore } = useQuery(GET_POLLS, {
    variables: {
      offset: 0,
      limit: 20,
      mine,
    },
  });
  const [hasMore, setHasMore] = useState(true);
  const deletedItems = useReactiveVar(deletedVar);

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  const fetchData = () =>
    fetchMore({
      variables: {
        offset: data.length,
        limit: 3,
      },
    }).then((req: any) => setHasMore(!!req.data.getPolls.length));

  let polls = data.getPolls;
  polls = polls.filter((poll) => !deletedItems[poll.id]);
  if (mine) {
    polls = polls.filter((poll) => poll.mine);
  }

  return <PollsView polls={polls} fetchData={fetchData} hasMore={hasMore} />;
}
