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
    <div className="w-full ">
      <form
        className="flex flex-col border border-gray-400 p-10 m-10 gap-2 rounded-lg w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        Poll Creation Form
        <input
          name="title"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ref={register}
          placeholder="Title"
        />
        <input
          name="description"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ref={register}
          placeholder="Description"
        />
        <select
          name="privacy"
          className="py-3 px-4 text-gray-700 bg-gray-200 border border-gray-200 rounded"
          ref={register}
          placeholder="Privacy"
        >
          <option value={PollPrivacy.PUBLIC}>Public</option>
          <option value={PollPrivacy.PRIVATE}>Private</option>
          <option value={PollPrivacy.LINKED}>Linked</option>
        </select>
        <CreateFormOptions register={register} />
        <input type="submit" />
      </form>
      <Link href="/">
        <a className="m-10">Return To Homepage!</a>
      </Link>
    </div>
  );
}
