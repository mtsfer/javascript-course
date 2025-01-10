class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, ` +
            `Speed: ${this.speed} km/h, ` +
            `Is trunk open? ${this.isTrunkOpen}`);
    }

    go() {
        if (this.isTrunkOpen) return;
        if (this.speed + 5 > 200) return;
        this.speed += 5;
    }

    brake() {
        if (this.speed - 5 < 0) return;
        this.speed -= 5;
    }

    openTrunk() {
        if (this.speed > 0) return;
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go () {
        if (this.speed + this.acceleration > 300) return;
        this.speed += this.acceleration;
    }

    openTrunk() {
        console.log("Race cars do not have a trunk.");
    }

    closeTrunk() {
        console.log("Race cars do not have a trunk.");
    }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Tesla", "Model 3");

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();

car1.go();
car1.go();
car1.brake();

car2.go();
car2.go();
car2.go();
car2.brake();

car1.displayInfo();
car2.displayInfo();

const raceCar = new RaceCar("McLaren", "F1", 20);

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();