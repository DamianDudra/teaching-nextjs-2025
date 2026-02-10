import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function HistoryPage() {
	const db = getDb();

	const events = await db
		.selectFrom("playback_events")
		.innerJoin("songs", "playback_events.song_id", "songs.id")
		.leftJoin("users", "playback_events.user_id", "users.id")
		.select([
			"playback_events.id",
			"playback_events.event_name",
			"playback_events.event_date",
			"playback_events.song_id as song_id",
			"songs.name as song_name",
			"songs.album_id as album_id",
			"users.name as user_name",
		])
		.orderBy("playback_events.event_date", "desc")
		.execute();

	return (
		<div className="min-h-screen p-8 sm:p-20">
			<main className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-6">Playback History</h1>

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Date</th>
								<th>Event</th>
								<th>Song</th>
								<th>User</th>
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
										{" "}
										<small className="opacity-60">(id: {e.song_id})</small>
									</td>
									<td>{e.user_name ?? "Unknown"}</td>
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


