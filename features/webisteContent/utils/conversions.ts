export const sortBasedOnId = <T extends { id: string | number }>(
  arr: T[] = [],
): T[] => {
  return [...arr].sort((a, b) => {
    const ai = Number(a.id);
    const bi = Number(b.id);

    if (Number.isNaN(ai) && Number.isNaN(bi)) return 0;
    if (Number.isNaN(ai)) return 1;
    if (Number.isNaN(bi)) return -1;

    return ai - bi;
  });
};

export function to24Hour(time: string) {
  const [timePart, modifier] = time.split(" ");
  const hrMin = timePart.split(":").map(Number);

  if (modifier === "PM" && hrMin[0] !== 12) hrMin[0] += 12;
  if (modifier === "AM" && hrMin[0] === 12) hrMin[0] = 0;

  return `${hrMin[0].toString().padStart(2, "0")}:${hrMin[1]
    .toString()
    .padStart(2, "0")}`;
}

export function to12Hour(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  let hours = Number(hoursStr);
  const modifier = hours >= 12 ? "PM" : "AM";

  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return `${hours}:${minutes} ${modifier}`;
}
