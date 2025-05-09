'use client'

import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	return (
		<div>
			<h1>Page {id}</h1>
			<p>Page content Edit</p>
		</div>
	);
}
