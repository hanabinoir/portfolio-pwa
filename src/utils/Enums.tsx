import { Component } from "react";
import Intro from "../sections/Intro";

export enum NavItem {
  intro = "Introduction",
  skills = "Skills",
  projects = "Projects"
};
export default class Enums {

  static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }
  
}