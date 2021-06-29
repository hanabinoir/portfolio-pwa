import JapaneseEra from "./JapaneseEra"
import { Browser } from "./Utils";

export function Wareki(date, lang) {
  const eras = [
    new JapaneseEra('令和', 'Reiwa', new Date('2019-05-01')),
    new JapaneseEra('平成', 'Heisei', new Date('1989-01-08')),
    new JapaneseEra('昭和', 'Showa', new Date('1926-12-25')),
    new JapaneseEra('大正', 'Taisho', new Date('1912-07-30')),
  ].sort((a, b) => a.dateStarted > a.dateStarted)

  for (let index = 0; index < eras.length; index++) {
    const e = eras[index];
    if (date >= e.dateStarted) {
      const year = date.getYear() - e.dateStarted.getYear() + 1
      return lang.includes('en') 
        ? `${e.nameEN} ${year}` 
        : `${e.name}${year}年`
    }
  }
}

export function LocalTime(date, locale = 'jp-JP', timezone = 'Japan') {
  let res

  if (locale == 'jp-JP') {
    const isChrome = Browser() == 'Chrome' 
    const str = date.toLocaleDateString(locale, { timeZone: timezone})
    const separator = isChrome ? '/' : '-'
    const parts = str.split(separator)
    res = isChrome
    ? `${parts[2]}年${parts[1]}月${parts[0]}日`
    : `${parts[0]}年${parts[1]}月${parts[2]}日`
  } else {
    res = date.toLocaleDateString(locale, { 
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return res
}

export function Experience(months, lang) {
  const years = Math.floor(months / 12.0)
  const remainder = months % 12

  let lblYear, lblMonth, res
  if (lang.includes('en')) {
    lblYear = years < 1 ? 'year' : 'years'
    lblMonth = months < 1 ? 'month' : 'months'

    res = years < 1 
      ? `${months} ${lblMonth}` 
      : `${years} ${lblYear} ${remainder} ${lblMonth}`
  } else {
    lblYear = '年'
    lblMonth = '月'

    if (months == 6) {
      res = '半年'
    } else if (remainder == 6) {
      res = `${years}年半`
    } else {
      res = years < 1 
        ? `${months}${lblMonth}` 
        : `${years}${lblYear}${remainder}${lblMonth}`
    }
  }
  return res
}