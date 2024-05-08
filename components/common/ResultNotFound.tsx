import Link from "next/link";
import Image from "next/image";


interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const ResultNotFound = ({title,description,link,linkTitle}:Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
     
      <h2 className="mt-8 font-bold text-black">{title}</h2>
      <p className="my-3.5 max-w-md text-center text-black">
        {description}
      </p>
      <Link href={link}>
        <button className="mt-5 min-h-[46px] rounded-lg bg-amber-400 px-4 py-3 text-white hover:bg-gray-400 dark:text-white">
          {linkTitle}
        </button>
      </Link>
    </div>
  );
};

export default ResultNotFound;