/** @type {import('./$types').PageServerLoad} */
export async function load() {
	await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second delay
	return {
		message: 'Data fetched successfully after 3 seconds!'
	};
}
