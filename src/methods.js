//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

export function round(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function splitArrIntoLengths(arr, length){
  let splitedArr = [];
  const calls = Math.floor(arr.length / length);
  for(let i = 0; i <= calls; i++){
    if(i === calls){
      splitedArr.push(arr.slice(i*length));
    }else{
      splitedArr.push(arr.slice(i*length, i*length + length));
    }
  }
  
  return splitedArr;
}

export function ellipses (str, maxLength){
  if(str.length > maxLength){
    return(str.slice(0, maxLength - 3) + "...");
  }else{
    return str;
  }
}

export function audioFeatureSort(clone, target){
  return clone.sort((a, b) => {
    return b.audio_features[target] - a.audio_features[target];
  });
}