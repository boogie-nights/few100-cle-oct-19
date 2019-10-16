describe('functions', () => {
    it('how to declare them', () => {
        // two ways:

        // 1. named function

        function add(a: number, b: number): number {
            return a + b;
        }
        expect(add(2, 2)).toBe(4);

        // 2. Anonymouse functions

        // anonymous function with the function keyword

        const subtract = function (a: number, b: number) {
            return a - b;
        };

        expect(subtract(10, 2)).toBe(8);

        const multiply = (a: number, b: number) => a * b;
        expect(multiply(3, 3)).toBe(9);
    });
    it('arrow functions', () => {
        const formatname = (first: string, last: string) => {
            if (last.length > 10) {
                throw new Error('Too long!');
            }
            return `${last}, ${first}`;
        };
        expect(formatname('Han', 'Solo')).toBe('Solo, Han');
        expect(() => formatname('Luke', 'Skywalkerrrrrrrrr')).toThrowError();
    });
    describe('parameters to functions', () => {
        it('an example - overloading', () => {
            function nameFormatter(first: string, last: string, middle?: string) {
                if (last.length > 10) {
                    throw new Error('Too long!');
                }
                let fullName = `${last}, ${first}`;
                if (middle) {
                    fullName += ` ${middle}.`;
                }
                return fullName;
            }

            expect(nameFormatter('Han', 'Solo')).toBe('Solo, Han');
            expect(nameFormatter('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        it('default values for parameters', () => {
            function add(a: number = 10, b: number = 15) {
                return a + b;
            }

            expect(add()).toBe(25);
            expect(add(15)).toBe(30);
            expect(add(undefined, 5)).toBe(15);
        });
        it('rest arguments', () => {
            function add(a: number, b: number, ...theRest: number[]) {
                const firstTwo = a + b;
                return theRest.reduce((x, y) => x + y, firstTwo);
            }

            expect(add(1, 2)).toBe(3);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
    });

    describe('Higher order functions', () => {
        it('an example of a function that takes a function', () => {
            function identity(n: string) { return n; }

            type StringModifer = (msg: string) => string;
            function printItOut(message: string, fn: StringModifer = identity): void {
                console.log(`At ${new Date().toISOString()}:`, fn(message));
            }

            printItOut('Tacos!', (n) => n.toUpperCase());
            printItOut('Tacos2', (n) => '***' + n + '***');
            printItOut('Tortilla!');
            printItOut('HOF Rawk!', makeUpper);

            function makeUpper(x: string) {
                return x.toUpperCase();
            }
        });
        it('using an object', () => {
            class TagMaker {

                private element: string;
                constructor(element: string) {
                    this.element = element;
                }

                make(content: string) {
                    return `<${this.element}>${content}</${this.element}>`;
                }
            }

            const h1Maker = new TagMaker('h1');
            expect(h1Maker.make('Tacos')).toBe('<h1>Tacos</h1>');
            expect(h1Maker.make('Chips')).toBe('<h1>Chips</h1>');

            const pMaker = new TagMaker('p');
            expect(pMaker.make('coolio')).toBe('<p>coolio</p>');
        });
    });
    it('not a HOF, doing it a "sane" way', () => {
        // <element>content</element>
        // <h1>Hello</h1>

        function tagMaker(element: string, content: string) {
            return `<${element}>${content}</${element}>`;
        }

        expect(tagMaker('h1', 'Tacos')).toBe('<h1>Tacos</h1>');
        expect(tagMaker('h1', 'Chips')).toBe('<h1>Chips</h1>');
        expect(tagMaker('h1', 'Salsa')).toBe('<h1>Salsa</h1>');
        expect(tagMaker('p', 'coolio')).toBe('<p>coolio</p>');
    });
    it('with a higher order function', () => {
        function tagMaker(element: string): (content: string) => string {
            return (content) => `<${element}>${content}</${element}>`;
        }

        const h1Maker = tagMaker('h1');

        expect(h1Maker('Tacos')).toBe('<h1>Tacos</h1>');
        expect(h1Maker('Chips')).toBe('<h1>Chips</h1>');
        const pMaker = tagMaker('p');
        expect(pMaker('coolio')).toBe('<p>coolio</p>');

        expect(tagMaker('h2')('kidding me?')).toBe('<h2>kidding me?</h2>');
    });
});
