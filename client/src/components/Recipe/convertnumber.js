export const convertnumber=(ingg)=>{
    if(ingg==='NaN')return 1
    let index=ingg?.indexOf('-');
    if(index!==-1){
      ingg=ingg?.substr(index+1);
    }
    index=ingg?.indexOf(' ')
    let ingg1=ingg?.substr(0,index);
    let ingg2=ingg?.substr(index+1,ingg.length);
    if(index!==-1){
      index=ingg1?.indexOf('/');
      if(index!==-1){
        let numerator=Number(ingg1?.substr(0,index));
        let denominator=Number(ingg1?.substr(index+1,ingg1.length))
        ingg1=Number(numerator/denominator)
      } 
      index=ingg2?.indexOf('/');
      if(index!==-1){
        let numerator=Number(ingg2?.substr(0,index));
        let denominator=Number(ingg2?.substr(index+1,ingg2.length))
        ingg2=Number(numerator/denominator)
      }
      ingg=Number(ingg1)+Number(ingg2)
    }else{
        index=ingg?.indexOf('/');
        if(index!==-1){
            let numerator=ingg?.substr(0,index);
        let denominator=ingg?.substr(index+1,ingg.length)
        ingg=Number(numerator/denominator)
        }
    }
    return parseFloat(ingg).toFixed(3);
}