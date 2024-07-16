export default function UserDisplay({ names }: Readonly<{ names: string[] }>) {
	// Filter out any names that are "anon" before rendering
	const filteredNames = names.filter(name => name.toLowerCase() !== "anon");

	const userDisplay = always(() => {
		if (filteredNames.length === 0) {
			return <></>;
		} else {
			return (
				<div class="w-full flex justify-center mt-4">
					<div class="flex flex-wrap justify-start items-center gap-4">
						{filteredNames.map((name) => (
							<div class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
								{name}
							</div>
						))}
					</div>
				</div>
			)
		}
	});
  
	return (
	  <>
			{userDisplay}
		</>
	);
}