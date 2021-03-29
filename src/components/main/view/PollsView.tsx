import { Poll } from '@prisma/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import PollView from './PollView';

export default function PollsView({
  polls,
  fetchData,
  hasMore,
  mine,
  removeFromList,
}: {
  polls: Poll[];
  fetchData: any;
  hasMore: boolean;
  mine: boolean;
  removeFromList: any;
}) {
  return (
    <InfiniteScroll
      dataLength={polls.length} // This is important field to render the next data
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
      {polls.map((poll: Poll) => (
        <PollView
          key={poll.id}
          poll={poll}
          mine={mine}
          removeFromList={removeFromList}
        />
      ))}
    </InfiniteScroll>
  );
}
