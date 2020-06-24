import dayjs from "dayjs";

export function toJST(date: Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}
