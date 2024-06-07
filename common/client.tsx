import AddVideoOverlay from "common/components/AddVideoOverlay.tsx";
import { Queue } from "./components/Queue.tsx";
import QRCodeOverlay from "common/components/QRCodeOverlay.tsx";
import SearchBar from "common/components/SearchBar.tsx";  // Den korrekten Pfad zu SearchBar.tsx verwenden

			<SearchBar /> 

				<div class="px-4 py-4 overflow-y-scroll h-screen">
					<Queue items={sampleQueue} type={'client'} />
				</div>

				<QRCodeOverlay />

				<AddVideoOverlay />
			</div>
		</main>);
}