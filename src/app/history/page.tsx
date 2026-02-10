import Link from "next/link";
import { getPlaybackEvents } from "@/actions/playback_event";

export default async function HistoryPage() {
  const events = await getPlaybackEvents(1);

	return (
		<div className="min-h-screen p-8 sm:p-20">
			<main className="max-w-4xl mx-auto">

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Date</th>
								<th>Event</th>
								<th>Song</th>
								<th>Album</th>
							</tr>
						</thead>
						<tbody>
							{events.map((e) => (
								<tr key={e.id}>
									<td>{new Date(e.event_date).toLocaleString()}</td>
									<td>{e.event_name}</td>
									<td>
										{e.song_name}
									</td>
									<td>
										{e.album_id ? (
											<Link className="link" href={`/album/${e.album_id}`}>
												View album
											</Link>
										) : (
											"-"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
}


