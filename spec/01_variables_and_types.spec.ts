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
