export enum NavItem {
  intro = "Introduction",
  techs = "Technologies",
  langs = "Languages",
  projects = "Projects"
}

export enum TechType {
  langs = "Programming Languages",
  backend = "Backend",
  frontend = "Frontend",
  os = "OS",
  ide = "IDE",
  other = "Other Tools"
}

export default class Enums {

  static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }
  
}