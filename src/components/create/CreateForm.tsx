import { useForm } from 'react-hook-form';
import { Poll, PollPrivacy } from '@prisma/client';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CREATE_POLL } from '../graphql/queries';
import CreateFormOptions from './CreateFormOptions';

export default function CreateForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [createPoll, { data }] = useMutation(CREATE_POLL);
  const onSubmit = (poll: Poll) => {
    createPoll({ variables: poll });
    router.push(`/`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" ref={register} placeholder="Title" />

        <input name="description" ref={register} placeholder="Description" />

        <select name="privacy" ref={register} placeholder="Privacy">
          <option value={PollPrivacy.PUBLIC}>Public</option>
          <option value={PollPrivacy.PRIVATE}>Private</option>
          <option value={PollPrivacy.LINKED}>Linked</option>
        </select>

        <CreateFormOptions register={register} />

        <input type="submit" />
      </form>
      <Link href="/">
        <a>Return To Homepage!</a>
      </Link>
    </div>
  );
}
