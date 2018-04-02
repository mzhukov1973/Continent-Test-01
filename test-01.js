   const doIt = (a, topNum = 5, ceiling = 100) => {
     let topNumArr = [];
     topNumArr.length = topNum;
     topNumArr.fill({sum:0,combo:[]});

     const fn = (n,srcArr,combo) => {
       if (n==0) {
         if (combo.length>0) {
           let sum=0;
           sum=combo.reduce((total,num)=>{return total+num});
           if (sum<=ceiling) { /*If sum<ceiling:*/
             if (sum>topNumArr[0].sum) { /*AND sum>(minTopNum) then store as proper (push to topNumArr, sort topNumArr by value and loose the lowest element)*/
               const sall = {'sum':sum,'combo':combo};
               topNumArr.push(sall);
               topNumArr.sort((a,b)=>{return a.sum-b.sum});
               topNumArr.splice(0,1);//Remove the first element
             }
           }
         }
         return;
       }
       for (let j=0;j<srcArr.length;++j) {
         fn(n-1, srcArr.slice(j+1), combo.concat([srcArr[j]]));
       }
       return;
     }

     for (let m=1;m<a.length-1;m++) {
       fn(m,a,[]);
     }
     return topNumArr;
   }

  function preDoIt() {
    let arr_in = [];
    if (document.getElementById('arrManual').value.length>0) {
      arr_in = document.getElementById('arrManual').value.split(' ');
      arr_in.forEach((val,idx,arr)=>{arr[idx]=isNaN(parseInt(val))?0:parseInt(val)});
    } else {
      arr_in.length = (isNaN(parseInt(document.getElementById('arrSize').value)))?20:parseInt(document.getElementById('arrSize').value);
      document.getElementById('arrSize').value = arr_in.length;
      const maxR = (isNaN(parseInt(document.getElementById('arrMaxValue').value)))?100:parseInt(document.getElementById('arrMaxValue').value);
      document.getElementById('arrMaxValue').value = maxR;
      console.log('arr_in.length:%d, maxR:',arr_in.length,maxR);
      for (let i=0;i<arr_in.length;i++) {
       arr_in[i]=parseInt(Math.random()*maxR);
      }
    }
    document.getElementById('inpArray').innerHTML = 'Resulting input array: ['+arr_in.toString()+']';
    const res = doIt(arr_in,5,100);
    let strRes = '';
    for (let i=0;i<res.length-1;i++) {
      strRes += res[i].sum + ':' + res[i].combo.toString() + ']<br>[';
    }
    strRes += res[res.length-1].sum + ':' + res[res.length-1].combo.toString() + ']';
    document.getElementById('firstFive').innerHTML = 'First five element combos with sum <=100:<br>['+strRes+'';
    console.log('arr_in',arr_in);
    console.log(res);
  }
