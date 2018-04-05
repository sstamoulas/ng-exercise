import { Injectable } from '@angular/core';

@Injectable() 
export class DataService {
  serviceData: Result[]; 
}

export class Result {
    name: Name;
    email: string;
    phone: string;
    picture: Picture;
}

export class Name {
    title: string;
    first: string;
    last: string;
}

export class Picture {
    large: string;
    medium: string;
    thumbnail: string;
}