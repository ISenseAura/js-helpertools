
# js-helpertools

A npm package which can be useful while building a node application. 
It contains some minor and major functions which developers often search for on google or stackoverflow.

For Example 
   - A Function to generate a random key
   - A Function to deeply sort an array
   - A Function to get one or more random element/s from an array
   - A Function to encrypt/decrypt a text

[Github Repository](https://www.github.com/zerapium)

## How To Use

Install js-helpertools with npm

```bash
  npm install js-helpertools
```
    
Basic Example

```javascript
 let Tools = require("js-helpertools");

 let randomKey = Tools.generateKey(16);
 //result : 5YzDqOfcT30EEqrr 
```
## List Of Functions

- #### Generate a key

```javascript
 Tools.generateKey(length,includeSC);
 // returns a string
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `length`      | `number` | **Required**. Length of the key  |
| `includeSC`      | `boolean` |  Whether to include special characters in the key |

- #### Get a random number within a limit

```javascript
  Tools.random(300);
  // returns a number ebtween 0 - 300
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `number` | **Required**. Limit  |

- #### Get a random element from an array

```javascript
 let array = [23,45,87,90];
 Tools.sampleOne(array);
 // returns 87
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `array`      | `array<any>` | **Required**. Array to get an element from |

- #### Get 2 or more random elements from an array

```javascript
 let array = [23,45,87,90];
 Tools.sampleMany(array,2);
 // returns [45,90]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `array`      | `array<any>` | **Required**. Array to get an element from |
| `amount`      | `number` | **Required**. amount of random elements you want |

- #### Check accuracy. Useful during building games

```javascript
 Tools.isLucky(60);
 // returns true or false
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Accuracy %`      | `number` | **Required**. Check the luckiness |

- #### Deeply shuffles an array

```javascript
 Tools.shuffle(array);
 // returns a shuffled array
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Array`      | `array` | **Required**. Array to shuffle |

- #### Compares two arrays. 

```javascript
 Tools.compareArrays(array1,array2);
 // returns true if elements of both arrays are same and in same order.
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Array 1 `      | `array<any>` | **Required**. First array |
| `Array 2 `      | `array<any>` | **Required**. Second array |


- #### Removes the element of given index in array and returns new array

```javascript
 Tools.removeElement(array,index);
 // returns updated array
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Array %`      | `array<any>` | **Required**. Array to remove element from |
| `Index`      | `number` | **Required**. Index of the element |


- #### Removes all characters,spaces, whitespaces from string and returns a lower case alphanumeric string.

```javascript
 Tools.toId("Hello Guys!~ Sup?? 123!!!");
 // returns "helloguyssup123"
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `text`      | `String` | **Required**. Text to convert into alphanumeric |

- #### Returns "1st, 2nd... nth" type string. depends on the number order

```javascript
 Tools.toNumberOrderString(21);
 // returns "21st"
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Number`      | `number` | **Required**.  |

- #### Escapes HTML characters

```javascript
 Tools.escapeHTML(html);
 // returns escaped HTML
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `HTML`      | `string` | **Required**. A HTML String  |

- #### Unescapes HTML characters

```javascript
 Tools.unescapeHTML(html);
 // returns unescaped HTML
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `HTML`      | `string` | **Required**. A HTML String  |

- #### Takes Date object and returns a time stamp string. example "2022-04-11 22:55:45"

```javascript
 Tools.toTimestampString(date);
 // returns "2022-04-11 22:55:45"
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `Object<Date>` | **Required**. Date object  |

- #### Takes Date object and returns a duration string. example '52 years, 3 months, 10 days, 17 hours, 28 minutes, and 37 seconds'

```javascript
 Tools.toDurationString(date)
 // returns a duration string
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `Object<Date>` | **Required**. Date object  |


- #### Returns all the possible permutations of given array elements

```javascript
 Tools.getPermutations(elements,min,max);
 // returns an array
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `elements`      | `array<any>` | **Required**. Array of elements to get permutations  |
| `min`      | `string` | **Required**. Minimum length of the permutations  |
| `max`      | `string` | **Required**. Maximum length of the permutations  |



- #### Returns all the possible combinations of given arrays elements

```javascript
 Tools.getCombinations(arr1,arr2,...,arrn);
 // returns an array
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `arr1`      | `array<any>` | **Required**. A normal array  |
| `arr2`      | `array<any>` | **Required**. A normal array  |
| `arrn`      | `array<any>` |  A normal array  |

- #### Calculate the execution time of a function

```javascript

 Tools.getRunTime(func,arg1,arg2);
 // returns the execution time in milliseconds
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `function`      | `function` | **Required**. The function of which the execution time is calculated |
| `arg1`      | `any` | A argument of the function  |
| `arg2`      | `any` |  A argument of the function  |

- #### Deeply clone an object

```javascript
 Tools.deepClone(obj);
 // returns an object
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `obj`      | `Object<any>` | **Required**. An Object to clone  |



## Contributing

Contributions are always welcome!

You can help us add more functions that can be useful for developers. Visit this project's [Github Repository](https://github.com/Zerapium/js-helpertools) and start a PR.

While adding more functions to this package try to - 
 - Not include any dependancy unless it's necessary
 - Make a clean code
 - Check the code for errors before submitting a PR
 - Add comments wherever necessary to explain whats happening
 - Drink caffeine that helps us keep up the good work ;) 




## Authors

- [@zerapium](https://www.github.com/zerapium)

