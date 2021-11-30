function gradingStudents(grades) {
    
    let ans = [];
    for(let grade of grades) {
        
        let near = Math.ceil(grade/5)*5;
        let diff = near - grade;
        
        if(grade < 38) ans.push(grade);
        
        else if( diff < 3 ) ans.push(near);
        
        else ans.push(grade);
        
    }
    
    return ans;

}
