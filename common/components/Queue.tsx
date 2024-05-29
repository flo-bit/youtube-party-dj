import QueueItem from "./QueueItem.tsx";

export default function Queue() {
	return (
<div class="space-y-4">
	{[...Array(10)].map((_, i) => <QueueItem key='1' />)}
</div>);
}