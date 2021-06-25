import JapaneseEra from "./JapaneseEra"

export default function Wareki(date) {
  const eras = [
    new JapaneseEra('令和', new Date('2019-05-01')),
    new JapaneseEra('平成', new Date('1989-01-08')),
    new JapaneseEra('昭和', new Date('1926-12-25')),
    new JapaneseEra('大正', new Date('1912-07-30')),
  ].sort((a, b) => a.dateStarted > a.dateStarted)

  for (let index = 0; index < eras.length; index++) {
    const e = eras[index];
    if (date >= e.dateStarted) {
      const year = date.getYear() - e.dateStarted.getYear() + 1
      return `${e.name}${year}年`
      break;
    }
  }
}