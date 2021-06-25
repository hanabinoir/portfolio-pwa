export enum NavItem {
  intro = "Introduction",
  techs = "Technologies",
  pr = "PR",
  projects = "Projects"
}

export enum TechType {
  langs = "Programming Languages",
  backend = "Backend",
  frontend = "Frontend",
  os = "OS",
  tools = "Tools"
}

export enum HttpMethod {
  get = "GET", 
  post = "POST", 
  put = "PUT", 
  delete = "DELETE"
}

export default class Enums {

  static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }
  
}