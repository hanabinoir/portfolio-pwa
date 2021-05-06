export enum NavItem {
  intro = "Intro",
  skills = "Skills",
  projects = "Projects"
};

export default class Enums {

  static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }
  
}