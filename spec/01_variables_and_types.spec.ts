describe('Variables in TypeScript', () => {
    it('any typing', () => {
        let x;

        x = 'dog';

        x = 3.14;

        x = function (a, b) {
            return a + b;
        };
    });
    it('implicit typing', () => {
        let x = 'dog';

        x = 3.14;
    });
    it('has union types', () => {
        let x: number | string;

        x = 12;

        x = 'tacos';
    });
    it('const cannot be reassigned', () => {
        const PI = 3.1415;

        // PI = 4;

        const movie = {
            title: 'Rise of Skywalker',
            yearReleased: 2018
        };

        movie.yearReleased = 2019;

        // Can change the values inside the object but can't reassign the object
        // movie = {
        // }

        const favoriteNumbers = [9, 20, 108];
        // favoriteNumbers = [3]
        favoriteNumbers[1] = 22;
    });
    it('var is evil and you should not use it', () => {

        const age = 22;

        if (age > 21) {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Old enough!';
        }
        expect(message).toBe('Old enough!');
    });
});

describe('Types', () => {
    // for more information see: TypeScriptLang website on basic types.
    it('has numbers', () => {
        const asInt = 12;
        const asFloat = 12.333;
        const asEasyToRead = 135_233_802.42;
        const asHex = 0xff;
        const asBase8 = 0o33;
        const asBinary = 0b1010101;
    });
    describe('string literals', () => {
        it('uses single quotes', () => {
            const message = 'Hello!';
            // tslint:disable-next-line: quotemark
            expect(message).toBe("Hello!");
        });
        it('using verbatim strings', () => {
            const story = `My life story.
            It was a dark and stormy night
            <h1>The End</h1>`;
            console.log(story);
        });
        it('use them as template strings', () => {
            const name = 'Bob';
            const pay = 32_000.00;

            const message1 = 'Employee ' + name + ' makes $' + pay + ' a year';

            const message2 = `Employee ${name} makes $${pay} a year`;

            expect(message1).toBe(message2);
        });
    });
    describe('array literals', () => {
        it('declaring arrays', () => {
            const things = [];

            things[0] = 12;
            things[1] = 'bread';
            things[300] = things;
            expect(things[300][1]).toBe('bread');

            const numbers = [1, 2, 3, 4];
            const friends: string[] = [];
            // numbers[5] = 'Tacos';
            // friends[0] = 32;

            let friendsAndNumbers: (string | number)[];

            let meals: Array<string>;
            let meals2: string[];

            const friendsAndNumbers2: Array<string | number> = ['Bob', 42, 'Sue', 99];

            const second = friendsAndNumbers2[2];
        });
        it('using typed arrays (tuples)', () => {
            type TsLintBasicRule = [boolean, string];
            const quoteMarkRule: TsLintBasicRule = [true, 'single'];
            const logRule: TsLintBasicRule = [false, 'log'];

            // quoteMarkRule[0] = 'tacos'; // nope! Not a boolean
            // quoteMarkRule[1] = 99; // nope! not a string

            const doIt = quoteMarkRule[1];


            type ThingyWithLetters = string;

            const myName: ThingyWithLetters = 'Jeff';
        });
    });
    describe('enums and union constants', () => {
        describe('enums', () => {
            it('has them', () => {
                enum SeatType { window, ailse, middle }
                let seatType: SeatType;
                seatType = (function () {
                    return SeatType.window;
                })();
                let price = 100;
                switch (seatType) {
                    case SeatType.window: {
                        price += 50;
                        break;
                    }
                    case SeatType.middle: {
                        price -= 25;
                        break;
                    }
                    case SeatType.ailse: {
                        price += 10;
                        break;
                    }
                    default: {
                        // optional - but if it isn't one of those
                    }
                }
                expect(price).toBe(150);
            });
        });
        describe('union constants', () => {
            it('should behave...', () => {
                // enum SeatType { window, ailse, middle }
                type SeatType = 'window' | 'aisle' | 'middle';
                let seatType: SeatType;
                seatType = (function () {
                    return 'window';
                })();
                let price = 100;
                switch (seatType) {
                    case 'window': {
                        price += 50;
                        break;
                    }
                    case 'middle': {
                        price -= 25;
                        break;
                    }
                    case 'aisle': {
                        price += 10;
                        break;
                    }
                    default: {
                        // optional - but if it isn't one of those
                    }
                }
                expect(price).toBe(150);
            });
        });
        describe('object literals', () => {
            it('has anonymouse objects', () => {

                interface Movie {
                    title: string;
                    director: string;
                    yearReleased: number;
                    mainActor?: string;
                }

                const thor: Movie = {
                    title: 'Thor Ragnarok',
                    director: 'Taika Waititi',
                    yearReleased: 2016
                };

                const drStrange: Movie = {
                    title: 'Dr. Strange',
                    director: 'Jeremy',
                    yearReleased: 2017,
                    mainActor: 'Bennie Cumberbatch'
                };

                expect(thor.title).toBe('Thor Ragnarok');
                thor.yearReleased = 2015;
                expect(thor.yearReleased).toBe(2015);
            });
            it('duck typing', () => {
                // Structural typing.
                interface IHaveAmessage { message: string; }
                function doIt(thingy: IHaveAmessage) {
                    console.log(thingy.message);
                }

                doIt({ message: 'Hello!' });

                const phoneCall = {
                    from: 'Mom',
                    message: 'Call me, you slacker'
                };

                doIt(phoneCall);
            });
        });
        describe('type assertions', () => {
            it('they are like type casts but they don\'t do anything but tell the compiler to calm down.', () => {
                let x: any;

                x = (function () {
                    return 'dog';
                })();

                // tslint:disable-next-line: no-angle-bracket-type-assertion
                const length: number = (<string>x).length;

                const length2: number = (x as string).length;

                expect(length).toBe(3);

                interface ValueAndString { value: number; display: string; }

                const numbers = [100, 89];
                const result = numbers.map(num => {
                    return {
                        value: num,
                        display: num.toString()
                    } as ValueAndString;
                });

                expect(result[0].value).toBe(100);
                expect(result[0].display).toBe('100');
            });
        });
    });
});
