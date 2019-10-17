// import { Employee } from './hr/employee';
// import { Department } from './hr/department';
import { Department, Employee, Raisable } from './hr';

describe('classes', () => {
    it('using a class', () => {
        const bob = new Employee('Bob', 'Smith', 82_000);

        expect(bob.firstName).toBe('Bob');
        expect(bob.currentSalary).toBe(82_000);

        bob.giveRaise(100_000);

        expect(bob.currentSalary).toBe(182_000);

        const dev = new Department();
        dev.name = 'Developers! Developers! Developers!';
        dev.manager = bob;

        const someOne: Raisable = bob;
        someOne.giveRaise(50);
    });
});

describe('misc', () => {
    const numbers = [1, 2, 3, 4, 5];
    it('immutably add an element to an array', () => {
        const newNumbers = [0, ...numbers, 6];
        expect(newNumbers).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
    it('immutably removing an element from an array', () => {
        const newNumbers = numbers.filter(n => n !== 3);
        expect(newNumbers).toEqual([1, 2, 4, 5]);
    });
    it('changing a property of an object immutably', () => {
        const movie = { title: 'Episode IV', yearReleased: 1978 };

        const newMovie = { ...movie, yearReleased: 1977 };

        expect(newMovie.yearReleased).toBe(1977);
        expect(movie.yearReleased).toBe(1978); // original is still wrong
    });
    it('array destructuring', () => {

        // const first = numbers[0];
        // const third = numbers[2];

        const [first, , third] = numbers;
        expect(first).toBe(1);
        expect(third).toBe(3);
    });
    it('object destructuring', () => {
        const movie = { title: 'Episode IV: A New Hope', yearReleased: 1977 };

        // const title = movie.title;
        // const year = movie.yearReleased;

        const { yearReleased: year, title } = movie;


        expect(title).toBe('Episode IV: A New Hope');
        expect(year).toBe(1977);
    });
});
