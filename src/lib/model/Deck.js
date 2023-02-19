import { Card } from "./Card";

export class Deck {
    constructor() {
        this.cards = [
            new Card(1,"combat", "Brute Force", 5, 1, "Attack attack attack! Rinse and Repeat..."),
            new Card(2,"combat", "JailBreak", 3, 3),
            new Card(3,"combat", "Whack-a-mole", 2, 2),
            new Card(4,"combat", "DDoS", 4, 0, "we are legion"),
            new Card(5,"combat", "Honeypot", 3, 5),
            new Card(6,"combat", "Ransomware", 4, 4),
            new Card(7,"combat", "Obfuscation", 2, 5),
            new Card(8,"combat", "Man in the Middle", 5, 2),            
            new Card(9,"combat", "Firewall", 1, 3),
            new Card(10, "aug", "Trojan Horse", 3, 1),
        ];
    }
}
