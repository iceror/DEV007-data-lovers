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


  jest.mock('../src/data.js', () => ({
    getCharacters: jest.fn()
  }));

  describe('computeStats', () => {
    beforeEach(() => {
      // Reset the mock implementation before each test
      jest.clearAllMocks();
    });

    it('should return correct last name count and house count', async () => {

      const mockData = {
        got: [
          { lastName: 'Stark', family: 'House Stark' },
          { lastName: 'Lannister', family: 'House Lannister' },
          { lastName: 'Stark', family: 'House Stark' },
          { lastName: 'Targaryen', family: 'House Targaryen' },
          { lastName: 'Lannister', family: 'House Lannister' },
          { lastName: 'Stark', family: 'House Stark' }
        ]
      };
      getCharacters.mockResolvedValue(mockData);

      const result = await computeStats();

      // Verify the expected output
      expect(result).toEqual({
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


      // expect(result).toEqual({
      //   lastNameCount: {
      //     'Baelish': 1, 'Baratheon': 5, 'Bolton': 2, 'Clegane': 1, 'Drogo': 1,
      //     'Giantsbane': 1, 'Grand Maester': 1, 'Greyjoy': 3, 'H ghar': 1, 'Hodor': 1, 'Lannister': 4, 'Martell': 1,
      //     'Mormont': 2, 'Naharis': 1, 'Sand': 1, 'Seaworth': 1, 'Snow': 1, 'Sparrow': 1, 'Stark': 8, 'Targaryen': 2,
      //     'Tarly': 1, 'Tarth': 1, 'The Red Woman': 1, 'Tyrell': 2, 'Unknown': 7, 'Worm': 1,
      //   },
      //   houseCount: {
      //     'Bronn': 1, 'Free Folk': 2, 'House Baelish': 1,
      //     'House Baratheon': 5,
      //     'House Bolton': 2,
      //     'House Clegane': 1,
      //     'House Greyjoy': 3,
      //     'House Lannister': 4,
      //     'House Lorath': 1,
      //     'House Mormont': 2,
      //     'House Naathi': 1,
      //     'House Naharis': 1,
      //     'House Sand': 1,
      //     'House Seaworth': 1,
      //     'House Stark': 10,
      //     'House Targaryen': 3,
      //     'House Tarly': 1,
      //     'House Tarth': 1,
      //     'House Tyrell': 2,
      //     'House Unknown': 5,
      //     'House Viper': 1,
      //     'Lorathi': 1,
      //     'Sparrow': 1,
      //     'Worm': 1,
      //   }
      // });

      expect(getCharacters).toHaveBeenCalledTimes(1);
    });
  });
});
