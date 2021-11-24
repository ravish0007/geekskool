function rotateLeft(d, arr) {
    
            function reverse(arr, i, j) {
                
                while(i< j) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    
                    i++; 
                    j--;
                }
                
            }

        reverse(arr, 0, d-1);
        reverse(arr, d, arr.length-1);
        reverse(arr, 0, arr.length-1);
    
        return arr;
}
