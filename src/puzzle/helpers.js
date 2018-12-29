
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