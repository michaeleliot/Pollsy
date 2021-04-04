import { useForm } from 'react-hook-form';
import { Poll, PollPrivacy } from '@prisma/client';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CREATE_POLL } from '../graphql/queries';
import CreateFormOptions from './CreateFormOptions';

export default function CreateForm() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [createPoll, { data }] = useMutation(CREATE_POLL);
  const onSubmit = (poll: Poll) => {
    if (Object.keys(errors).length === 0) {
      createPoll({ variables: poll });
      router.push(`/`);
    }
  };

  console.log(errors);

  return (
    <div className="w-full ">
      <form
        className="flex flex-col border border-gray-400 p-10 m-10 gap-2 rounded-lg w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        Poll Creation Form
        <input
          name="title"
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border-2 ${
            errors.title
              ? `border-red-500 focus:border-red-500`
              : `border-gray-200 focus:border-gray-500`
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white `}
          ref={register({ required: true })}
          placeholder="Title"
        />
        <input
          name="description"
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border-2 ${
            errors.description
              ? `border-red-500 focus:border-red-500`
              : `border-gray-200 focus:border-gray-500`
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
          ref={register({ required: true })}
          placeholder="Description"
        />
        <CreateFormOptions register={register} errors={errors} />
        <input type="submit" />
      </form>
      <Link href="/">
        <a className="m-10">Return To Homepage!</a>
      </Link>
    </div>
  );
}
