'use client'

import {use} from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const {id} = use(params);

	 console.log(id)

	return (
		<>
		     
		</>
	);
}
