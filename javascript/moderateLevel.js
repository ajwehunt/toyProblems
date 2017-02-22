//MODERATE LEVEL JS TOY PROBLEMS

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

//reversedLooper
//  Create a function called 'reversedLooper' that when passed an array will loop through it backwards and subtract 2 from the last element, 1 from the second to last, 0 from to the third to last, add one to the fourth to last, add 2 to the fifth to last. Continue increasing the amount added by 1, until it reaches the front of the array.  Return the list when you are done
var testArray = [1, 1, 2, 3, 5, 8, 13, 21];
// result should be [ 6, 5, 5, 5, 6, 8, 12, 19 ]
function reversedLooper(arr) {
  var result = [],
      x = 2;
  for (var i = arr.length - 1; i >= 0; i--) {
    result[i] = (arr[i] - x);
    x--;
  }
  return result;
}
//test
console.log(reversedLooper(testArray));

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Finish the function missingNo so that it takes in a sorted array of integers which contains all integers between 0 and N except one value, and returns the missing integer in that array. Example: if you are passed [0,1,2,3,5], this is an array between 0 and 5, it is sorted. However, the number 4 is missing. Your function needs to return 4.
function missingNo(numArray) {
  return numArray.sort((a,b)=>{
    if (a !== b - 1){
    	return b;
    }
  })[0]-1;
}
var arr1 = [0,1,2,3,5];
console.log(missingNo(arr1))

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

// accum("abcd");    // "A-Bb-Ccc-Dddd"
// accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// accum("cwAt");    // "C-Ww-Aaa-Tttt"

function accum(s) {
  var arr = s.split(''),
      arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j <= i; j++) {
      arr2.push(arr[i]);
    }
    if (i < arr.length - 1) {arr2.push('-')}
  }
  var result = arr2.join('').split('-')
  return result.map(x => x[0].toUpperCase() + x.slice(1).toLowerCase() + '-').join('').slice(0, -1);
}
//slimmed down
function accum(s) {
  return s.split('').map((x,index) => x.toUpperCase()+Array(index+1).join(x.toLowerCase())).join('-');
}
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Some numbers have funny properties. For example:
//
// 89 --> 8¹ + 9² = 89 * 1
//
// 695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2
//
// 46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51
// Given a positive integer n written as abcd... (a, b, c, d... being digits) and a positive integer p we want to find a positive integer k, if it exists, such as the sum of the digits of n taken to the successive powers of p is equal to k * n. In other words:
//
// Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
// If it is the case we will return k, if not return -1.
//
// Note: n, p will always be given as strictly positive integers.
//
// digPow(89, 1) should return 1 since 8¹ + 9² = 89 = 89 * 1
// digPow(92, 1) should return -1 since there is no k such as 9¹ + 2² equals 92 * k
// digPow(695, 2) should return 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2
// digPow(46288, 3) should return 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

function digPow(n, p){
  var k = n.toString().split('').map((x,i)=>Math.pow(x,(i+p))).reduce((a,b)=>a+b)/n
  return k%1===0?k:-1
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

// The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollars bill. A "Avengers" ticket costs 25 dollars.
//
// Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.
//
// Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the tickets strictly in the order people follow in the line?
//
// Return YES, if Vasya can sell a ticket to each person and give the change. Otherwise return NO.
//
// Examples:
//
// // === JavaScript ==
//
// tickets([25, 25, 50]) // => YES
// tickets([25, 100])
//         // => NO. Vasya will not have enough money to give change to 100 dollars

function tickets(p){
  var vasya = {
    two5: 0,
    fiveO: 0,
    hundO: 0
  };

  for (var i = 0; i < p.length; i++) {

    if (p[i]===25) {
      vasya.two5 += 1
    } else if (p[i]===50) {
      vasya.fiveO += 1
      vasya.two5 -= 1
    } else if (p[i]===100) {
      if (vasya.fiveO){
        vasya.fiveO-=1;
        vasya.two5-=1
      } else {
        vasya.two5-=3
      }
        vasya.hundO += 1
    }
    if (vasya.two5<0||vasya.fiveO<0) {
      return 'NO'
    }
  }
  return 'YES'
}

//nice form
function Clerk(name) {
  this.name = name;

  this.money = {
    25 : 0,
    50 : 0,
    100: 0
  };

  this.sell = function(element, index, array) {
    this.money[element]++;

    switch (element) {
      case 25:
        return true;
      case 50:
        this.money[25]--;
        break;
      case 100:
        this.money[50] ? this.money[50]-- : this.money[25] -= 2;
        this.money[25]--;
        break;
    }
    return this.money[25] >= 0;
  };
}

function tickets(peopleInLine){
  var vasya = new Clerk("Vasya");
  return peopleInLine.every(vasya.sell.bind(vasya)) ? "YES" : "NO";
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

// Description:
//
// You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns N.
//
// For example:
//
// [2, 4, 0, 100, 4, 11, 2602, 36]
//
// Should return: 11
//
// [160, 3, 1719, 19, 11, 13, -21]
//
// Should return: 160


////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Directions reduction
// … a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too. Going to one direction and coming back the opposite direction is a needless effort. Since this is the wild west, with dreadfull weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!
//
// Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).
//
// ex:
// Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]), ["WEST"])
// Test.assertSimilar(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]), ["NORTH", "WEST", "SOUTH", "EAST"])
// Test.assertSimilar(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]), [])

//my answer
const dirReduc = (arr) => {
  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i+1] && arr[i].length === arr[i+1].length) {
      arr.splice(i,2);
      i = -1;
    }
  }
  return arr;
}

//codewars top
function dirReduc(plan) {
  var opposite = {
    'NORTH': 'SOUTH', 'EAST': 'WEST', 'SOUTH': 'NORTH', 'WEST': 'EAST'};
  return plan.reduce(function(dirs, dir){
      if (dirs[dirs.length - 1] === opposite[dir])
        dirs.pop();
      else
        dirs.push(dir);
      return dirs;
    }, []);
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.
//
// For example:
//
//  persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
//                        // and 4 has only one digit
//
//  persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
//                         // 1*2*6 = 12, and finally 1*2 = 2
//
//  persistence(4) === 0 // because 4 is already a one-digit number

//good for recursion practice
const persistence = (num) => {
  let counter = 0;

  const multiply = (num) => {
    let nums = num.toString().split('');
    if (nums.length < 2) {
      return counter
    } else {
      counter++
      return multiply(nums.reduce((a,b)=>a*b))
    }
  }

  multiply(num)
  return counter
}

//codewars solution.  while loop eliminates the need for recursion
function persistence(num) {
   var times = 0;

   num = num.toString();

   while (num.length > 1) {
     times++;
     num = num.split('').map(Number).reduce((a, b) => a * b).toString();
   }

   return times;
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Create a function that returns the name of the winner in a fight between two fighters.
//
// Each fighter takes turns attacking the other and whoever kills the other first is victorious. Death is defined as having health <= 0.
//
// Each fighter will be a Fighter object/instance. See the Fighter class below in your chosen language.
//
// Both health and damagePerAttack (damage_per_attack for python) will be integers larger than 0. You can mutate the Fighter objects.
//
// function Fighter(name, health, damagePerAttack) {
//         this.name = name;
//         this.health = health;
//         this.damagePerAttack = damagePerAttack;
//         this.toString = function() { return this.name; }
// }
//more recursion practice :
const declareWinner = (fighter1, fighter2, firstAttacker) => {
  const battle = () => {
    if (fighter1.health <= 0 && fighter2.health <= 0){
      return firstAttacker
    } else if (fighter1.health <= 0) {
      return fighter2.name
    } else if (fighter2.health <= 0) {
      return fighter1.name
    } else {
      fighter1.health -= fighter2.damagePerAttack
      fighter2.health -= fighter1.damagePerAttack
      return battle()
    }
  }
  return battle()
}

//codewars
function declareWinner(fighter1, fighter2, firstAttacker) {
  var fac1 = Math.ceil( fighter1.health / fighter2.damagePerAttack );
  var fac2 = Math.ceil( fighter2.health / fighter1.damagePerAttack );
  if(fac1 < fac2) {
    return fighter2.name;
  } else if(fac2 < fac1) {
    return fighter1.name;
  } else {
    return firstAttacker;
  }
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Lists are data structures composed of nested objects, each containing a single value and a reference to the next object.
//
// Here's an example of a list in JavaScript:
//
// {value: 1, next: {value: 2, next: {value: 3, next: null}}}
// In Python, lists will be represented by a preloaded LinkedList class with the members value and next. Here's an example:
//
// LinkedList(1, LinkedList(2, LinkedList(3)))
// Write a function listToArray (or list_to_array in Python) that converts a list to an array, like this:
//
// [1, 2, 3]
// Assume all inputs are valid lists with at least one value. For the purpose of simplicity, all values will be either numbers, strings, or Booleans.

//I am starting to really like recursion
const listToArray = (list) => {
  let result = []

  const addValue = (obj) => {
    if (!obj.next) {
      result.push(obj.value)
      return
    }
    result.push(obj.value)
    addValue(obj.next)
  }
  addValue(list)

  return result
}


///really cool for loop answer
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.next)
    array.push(node.value);
  return array;
}

//better recursion
function listToArray(list) {
  return !list ? [] : [list.value].concat(listToArray(list.next));
}

//while loop
function listToArray(list) {
  var temp = [];
  while(list){
    temp.push(list.value);
    list = list.next;
  }
  return temp;
}


////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
