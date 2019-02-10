
export const range = (from,to) => [...Array(to + 1).keys()].slice(from)

export const isOrdered = (array) => {
    let i = 0,j=1,inOrder = true
    do {
       inOrder = array[i] < array[j]
       if(!inOrder) return false 
       i++;
       j++;
    } while (j < array.length);
    return inOrder;
}

export const shuffle = (array,shuffledArray=[]) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    if (shuffledArray.length === array.length) {
      return shuffledArray;  
    }
    if (!shuffledArray.includes(array[randomIndex])) {
        shuffledArray.push(array[randomIndex])
    }
    return shuffle(array,shuffledArray)
}

export function secondsToTimeString(seconds){
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function isObjectsEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}