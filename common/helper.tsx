export default function addDurations(duration1: string, duration2: string) {
  const duration1Partitions = duration1.split(":").map(Number);
  const duration2Partitions = duration2.split(":").map(Number);
  const duration1Seconds = duration1Partitions[0] * 60 + duration1Partitions[1];
  const duration2Seconds = duration2Partitions[0] * 60 + duration2Partitions[1];
  const totalSeconds = duration1Seconds + duration2Seconds;
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${seconds}`;
}