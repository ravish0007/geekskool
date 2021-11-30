function circularArrayRotation(a, k, queries) {
   
   let ans = [];
   
   k = k%a.length;
   
   function reverse(arr, i, j) {
       while(i < j) {
           
       [arr[i], arr[j]] = [arr[j], arr[i]];
       i++; j--;
       } 
   }
   

   reverse(a, 0, a.length-1);
   reverse(a, 0, k-1);
   reverse(a, k, a.length-1);
   
   for(let x of queries) {
       ans.push(a[x]);
   }
   return ans;
   
}
