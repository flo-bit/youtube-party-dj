export default function addDurations(duration1: string, duration2: number) {
  const duration1Partitions = duration1.split(":").map(Number);
  //const duration2Partitions = duration2.split(":").map(Number);
  const duration1Seconds = duration1Partitions[0] * 60 + duration1Partitions[1];
  //const duration2Seconds = duration2Partitions[0] * 60 + duration2Partitions[1];
  const totalSeconds = duration1Seconds + duration2;
  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = totalSeconds % 60;
  const printSeconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return minutes+ ":" + printSeconds;
}