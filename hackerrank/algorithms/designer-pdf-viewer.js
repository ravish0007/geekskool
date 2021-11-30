function designerPdfViewer(h, word) {
    
    let max = -Infinity;
    for(let i = 0; i < word.length; i++) {
        max = Math.max(max, h[word.charCodeAt(i) - 97]);
    }
    return max * word.length;
}
