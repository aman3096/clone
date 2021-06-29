const s = "100111"

const count = (d)=>{
    let ans = 0;
    console.log("here",d);
    for(let i=0;i<d.length;i++){
        if(d[i]=="1"){
            ans++;
        }
    }
    console.log('ans ',ans);
    return ans;
}

const search = (s,x)=>{
    let len = s.length;
    let ones=0;
    let ans = 0;
    let length = 0;
    for(let i=0;i<s.length;i++){
        if(s[i]==="1"){
            ones++;
        }
    }
    if(ones<x){
        return 0;
    }
    else if(ones==x){
        return 1;
    }
    else{
        length++;
        for(let i=0; i<len-1-x;i++){
            for(let j=x;j<len;j++){
                temp= s.substring(i,i+j);
                ans=count(temp);
                if(ans>=x){
                    length++
                }
            }
        }
    }
    return length;
}
console.log(search(s,2));