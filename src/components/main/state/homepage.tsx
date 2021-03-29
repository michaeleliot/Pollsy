import PollsAPI from '../view/PollsAPI';
import TopBar from '../view/TopBar';

export default function HomePage({
  session,
  mine,
}: {
  session: any;
  mine: boolean;
}) {
  return (
    <>
      <TopBar email={session.user.email} />
      <PollsAPI mine={mine} />
    </>
  );
}
