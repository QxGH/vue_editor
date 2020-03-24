const isUndefined = (val) => {
  if (typeof (val) == 'undefined') {
    return true;
  } else {
    return false;
  }
};

const isNull = (val) => {
  if (!val && typeof(val)!="undefined" && val!=0){ 
    return true;
  } else {
    return false;
  }
};


export {
  isUndefined,
  isNull
}