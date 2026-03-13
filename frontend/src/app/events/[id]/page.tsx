import { notFound } from "next/navigation";
import { getEventById } from "@/lib/api/events";
import { EventDetailsWithRegistration } from "@/components/events/EventDetailsWithRegistration";

type EventsDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventsDetailsPage(
  props: EventsDetailsPageProps,
) {
  const params = await props.params;

  const event = await getEventById(params.id).catch((error) => {
    const message =
      error instanceof Error ? error.message : "Event could not be loaded";

    if (message.toLowerCase().includes("not found")) {
      notFound();
    }

    throw error;
  });

  return (
    <div className="flex flex-col gap-4">
      <EventDetailsWithRegistration event={event} />
    </div>
  );
}

