var arr = [1, 2, 3, 4, 5];
function double(arrr) {
    for(let i = 0; i < arrr.length; i++) {
        arr[i] = arr[i] * 2;
    }
    return arrr;
}
var ans = double(arr);
console.log(ans);


let ans2 = arr.map((val) => {
    return val * 2;
});
console.log(ans2);



// we have an given array which will have object inside it the of object
// is name age you have to add third field third field isAllowed true
// or false if age > 25 is allowed true then false

let array = [
    {
        name: "chirag",
        age:20
    }, 
    {
        name: "raman",
        age: 24
    },
    {
        name: "durgesh",
        age: 28
    }
];

let newArray = [];
for(var i = 0; i < array.length; i++) {
    if(array[i].age > 25) {
        newArray.push({
            name: array[i].name,
            age: array[i].age,
            isAllowed: false
        })
    } else {
        newArray.push({
            name: array[i].name,
            age: array[i].age,
            isAllowed: true
        })
    }
}

console.log(newArray);