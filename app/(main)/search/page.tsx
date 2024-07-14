import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.query) {
    redirect("/");
  }

  return <div></div>;
}
