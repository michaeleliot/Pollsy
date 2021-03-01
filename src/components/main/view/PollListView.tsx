import { Poll } from '@prisma/client';

export default function PollListView({ data }: { data: Poll[] }) {
  return (
    <ul>
      {data.map((poll: Poll) => (
        <li>{`${poll.title}: ${poll.description}`}</li>
      ))}
    </ul>
  );
}
