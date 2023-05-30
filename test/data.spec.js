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

  it('should return an array with the names sorted alphabetically', async () => {
    global.fetch = jest.fn(() => {
      const data = {
        got: [
          {
            "id": 0,
            "firstName": "Daenerys",
            "lastName": "Targaryen",
            "fullName": "Daenerys Targaryen",
            "title": "Mother of Dragons",
            "family": "House Targaryen",
            "imageUrl": "https://thronesapi.com/assets/images/daenerys.jpg",
            "born": "284 BC"
          },
          {
            "id": 1,
            "firstName": "Samwell",
            "lastName": "Tarly",
            "fullName": "Samwell Tarly",
            "title": "Maester",
            "family": "House Tarly",
            "imageUrl": "https://thronesapi.com/assets/images/sam.jpg",
            "born": "283 BC"
          },
          {
            "id": 2,
            "firstName": "Jon",
            "lastName": "Snow",
            "fullName": "Jon Snow",
            "title": "King of the North",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/jon-snow.jpg",
            "born": "283 BC"
          },
          {
            "id": 3,
            "firstName": "Arya",
            "lastName": "Stark",
            "fullName": "Arya Stark",
            "title": "No One",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/arya-stark.jpg",
            "born": "289 BC"
          },
          {
            "id": 4,
            "firstName": "Sansa",
            "lastName": "Stark",
            "fullName": "Sansa Stark",
            "title": "Lady of Winterfell",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/sansa-stark.jpeg",
            "born": "286 BC"
          },
          {
            "id": 5,
            "firstName": "Brandon",
            "lastName": "Stark",
            "fullName": "Brandon Stark",
            "title": "Lord of Winterfell",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/bran-stark.jpg",
            "born": "290 BC"
          }
        ]
      };

      return Promise.resolve({
        json: () => Promise.resolve(data),
      })
    });

    await expect(await sortData('ascending')).toEqual(
      ["Arya", "Brandon", "Daenerys", "Jon", "Samwell", "Sansa"])
  });

  it('should return an array with the names sorted alphabetically in descending order', async () => {
    global.fetch = jest.fn(() => {
      const data = {
        got: [
          {
            "id": 0,
            "firstName": "Daenerys",
            "lastName": "Targaryen",
            "fullName": "Daenerys Targaryen",
            "title": "Mother of Dragons",
            "family": "House Targaryen",
            "imageUrl": "https://thronesapi.com/assets/images/daenerys.jpg",
            "born": "284 BC"
          },
          {
            "id": 1,
            "firstName": "Samwell",
            "lastName": "Tarly",
            "fullName": "Samwell Tarly",
            "title": "Maester",
            "family": "House Tarly",
            "imageUrl": "https://thronesapi.com/assets/images/sam.jpg",
            "born": "283 BC"
          },
          {
            "id": 2,
            "firstName": "Jon",
            "lastName": "Snow",
            "fullName": "Jon Snow",
            "title": "King of the North",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/jon-snow.jpg",
            "born": "283 BC"
          },
          {
            "id": 3,
            "firstName": "Arya",
            "lastName": "Stark",
            "fullName": "Arya Stark",
            "title": "No One",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/arya-stark.jpg",
            "born": "289 BC"
          },
          {
            "id": 4,
            "firstName": "Sansa",
            "lastName": "Stark",
            "fullName": "Sansa Stark",
            "title": "Lady of Winterfell",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/sansa-stark.jpeg",
            "born": "286 BC"
          },
          {
            "id": 5,
            "firstName": "Brandon",
            "lastName": "Stark",
            "fullName": "Brandon Stark",
            "title": "Lord of Winterfell",
            "family": "House Stark",
            "imageUrl": "https://thronesapi.com/assets/images/bran-stark.jpg",
            "born": "290 BC"
          }
        ]
      };

      return Promise.resolve({
        json: () => Promise.resolve(data),
      })
    });

    await expect(await sortData('descending')).toEqual(
      ["Sansa", "Samwell", "Jon", "Daenerys", "Brandon", "Arya"])
  });
});// end describe

describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('should return correct last name count and house count', async () => {

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
      });
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
