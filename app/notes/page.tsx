import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ page: string; search: string }>;
}

async function Notes({ params }: NotesProps) {
  const searchParams = await params;
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ search, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
}

export default Notes;
