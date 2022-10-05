export function getList(array,listname) {
    for (let item=0; item<array.length; item++){
        if (String(array[item].name) === String(listname)){
            return array[item]
        }
    }
    return null
}
  