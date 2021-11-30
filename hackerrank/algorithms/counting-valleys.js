function countingValleys(steps, path) {
    
    let sealevel = 0;
    let valleys = 0;
    
    if (path[0] == 'U') sealevel = 1;
    else sealevel = -1;
    
    for(let i = 1; i < steps; i++) {
        

        
        if(path[i] == 'U') sealevel++;
        else sealevel--;
        
        if (sealevel == 0 && path[i] == 'U') valleys++;
        
    }
    

    return valleys;

}
