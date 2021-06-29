export default class JapaneseEra {
  name: String
  nameEN: String
  dateStarted: Date

  constructor(name: String, nameEN:String, dateStarted: Date) {
    this.name = name
    this.nameEN = nameEN
    this.dateStarted = dateStarted
  }
}