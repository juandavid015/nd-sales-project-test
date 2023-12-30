import useForm from '@/app/hooks/useForm';

export default function Results() {
  const { result } = useForm();
  if (result.type === null) return null;
  return (
    <div className="w-full text-center">
      <p
        className={`${result.type === 'error' ? 'text-red-warning' : 'text-main-color'}
        py-2 px-4 bg-white w-fit mx-auto font-bold`}
      >
        {result.message}
      </p>
    </div>
  );
}
