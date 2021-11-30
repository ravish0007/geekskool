function timeConversion(s) {
        
        let [h, m, s_] = s.slice(0, s.length-2).split(':');
        
        console.log(h, m, s_)
        
        let format = s.slice(s.length-2);
        
        
        if (format == 'AM' && h == '12') h = '00';
        
        if(format == 'PM') h = Number(h)%12 + 12;
        
        
        return [h,m,s_].join(':');
        
}
