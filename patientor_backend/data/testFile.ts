
type Airplane ={
    model: string;
    flightNumber: string;
    timeOfDeparture: Date;
    timeOfArrival: Date;
    caterer: Caterer;
    seats: Seat[];

};

type Seat = {
name:string;
number: string;
};

type Caterer ={
    name: string;
    address: string;
    phone: number;
};

const airplane : Airplane = {
    model: "Airbus A380",
    flightNumber: "A2201",
    timeOfDeparture: new Date(),
    timeOfArrival: new Date(),
    caterer: {
      name: "Special Food Ltd",
      address: "484, Some Street, New York",
      phone: 1452125,
    },
    seats: [
      {
        name: "Mark Allen",
        number: "A3",
      },
      {
        name: "John Doe",
        number: "B5",
      },
    ],
  };


console.log(airplane);