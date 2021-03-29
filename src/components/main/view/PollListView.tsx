import { Poll, Option } from '@prisma/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import PollView from './PollView';

export default function PollListView({
  data,
  fetchMore,
  mine,
}: {
  data: Poll[];
  fetchMore: any;
  mine: boolean;
}) {
  const [hasMore, setHasMore] = useState(true);
  const fetchData = () =>
    fetchMore({
      variables: {
        offset: data.length,
        limit: 3,
      },
    }).then((req: any) => setHasMore(!!req.data.getPolls.length));
  return (
    <InfiniteScroll
      dataLength={data.length} // This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-3"
      endMessage={
        <p style={{ textAlign: `center` }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.map((poll: Poll) => (
        <PollView key={poll.id} poll={poll} mine={mine} />
      ))}
    </InfiniteScroll>
  );
}
