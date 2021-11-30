function catAndMouse(x, y, z) {

    let d1 = Math.abs(x-z);
    let d2 = Math.abs(y-z);
    
    if(d1 == d2) return "Mouse C";
    else if(d1 > d2) return "Cat B";
    else return "Cat A";
    

}
