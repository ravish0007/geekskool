function hurdleRace(k, height) {
    
    height.sort();
    let ans = 0;
    let capacity = k;
    
    for(let o of height) {

        if(o > k) {
            ans += o-k;
            k =o;
        }
        

    }
    
    return ans;
}
