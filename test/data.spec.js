import { getCharacters, sortData, computeStats } from '../src/data.js';

describe('getCharacters', () => {
  it('is a function', () => {
    expect(typeof getCharacters).toBe('function');
  });
});

describe('sortData', () => {
  it('is a function', () => {
    expect(typeof sortData).toBe('function');
  });
});

describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('should return correct last name count and house count', async () => {

    //sacar data y global
    global.fetch = jest.fn(() => {
      const data = {
        got: [
          { lastName: 'Stark', family: 'House Stark' },
          { lastName: 'Lannister', family: 'House Lannister' },
          { lastName: 'Stark', family: 'House Stark' },
          { lastName: 'Targaryen', family: 'House Targaryen' },
          { lastName: 'Lannister', family: 'House Lannister' },
          { lastName: 'Stark', family: 'House Stark' }
        ]
      };

      return Promise.resolve({
        json: () => Promise.resolve(data),
      })
    })

    // Verify the expected output
    await expect(await computeStats()).toEqual({
      lastNameCount: {
        Stark: 3,
        Lannister: 2,
        Targaryen: 1
      },
      houseCount: {
        'House Stark': 3,
        'House Lannister': 2,
        'House Targaryen': 1
      }
    });
  });
});
