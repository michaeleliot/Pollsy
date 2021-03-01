import { useForm } from 'react-hook-form';
import { Poll } from '@prisma/client';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { CREATE_POLL } from '../graphql/queries';
import CreateFormOptions from './CreateFormOptions';

export default function CreateForm() {
  const { register, handleSubmit } = useForm();
  const [createPoll, { data }] = useMutation(CREATE_POLL);
  const onSubmit = (poll: Poll) => createPoll({ variables: poll });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" ref={register} placeholder="Title" />

        <input name="description" ref={register} placeholder="Description" />

        <CreateFormOptions register={register} />

        <input type="submit" />
      </form>
      {JSON.stringify(data)}
      <Link href="/">
        <a>Return To Homepage!</a>
      </Link>
    </>
  );
}
