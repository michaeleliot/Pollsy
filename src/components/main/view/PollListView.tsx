import { Poll, Option } from '@prisma/client';
import PollView from './PollView';

export default function PollListView({ data }: { data: Poll[] }) {
  return (
    <ul>
      {data.map((poll: Poll) => (
        <PollView key={poll.id} poll={poll} />
      ))}
    </ul>
  );
}
