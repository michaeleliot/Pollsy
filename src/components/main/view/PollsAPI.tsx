import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_POLLS } from '../../graphql/queries';
import PollsState from './PollsState';

export default function PollsAPI({ mine }: { mine: boolean }) {
  const { loading, error, data, fetchMore } = useQuery(GET_POLLS, {
    variables: {
      offset: 0,
      limit: 20,
      mine,
    },
  });
  const [hasMore, setHasMore] = useState(true);

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  const fetchData = () =>
    fetchMore({
      variables: {
        offset: data.length,
        limit: 3,
      },
    }).then((req: any) => setHasMore(!!req.data.getPolls.length));

  return (
    <PollsState
      data={data.getPolls}
      fetchData={fetchData}
      hasMore={hasMore}
      mine={mine}
    />
  );
}
