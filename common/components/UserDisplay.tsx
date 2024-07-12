export default function UserDisplay({ names }: Readonly<{ names: string[] }>) {
	// Filter out any names that are "anon" before rendering
	const filteredNames = names.filter(name => name.toLowerCase() !== "");
  
	return (
	  <div class="flex flex-wrap justify-start items-center gap-4 p-4">
		{filteredNames.map((name) => (
		  <div class="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
			{name}
		  </div>
		))}
	  </div>
	);
  }
  
  
 
  