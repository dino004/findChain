const data = `942517
605676
498291
668826
357057
478151
315629
007148
252887
421662
284505
467650
115330
648206
207562
612298
576885
294200
847595
021597
074878
801997
585401
168510
385293
151863
022142
340350
976151
337989
863284
488310
303887
939173
331413
905657
833617
170794
094486
551394
943693
147970
400196
537505
367493
117178
675840
868721
519081
735564
401733
915348
169233
324651
958675
368753
861460
401341
343222
794373
816374
535119
188234
577779
097792
729303
782637
148159
830641
716890
397853
871196
277603
749226
839595
131852
409432
810698
456030
529185
758823
265024
051041
699031
737269
139340
730977
249786
039931
055669
100107
653178
279773
336550
332847
685485
423269
193536
890062
377637
595777
412134
322736
546929
616370
767332
781184
920944
851005
258850
064083
051202
427711
359855
540928
314284
085261
880969
649699
064881
705423
646927
252556
272007
217511
620286
229724
108865
124636
231417
961201
658432
775416
246027
854036
687762
389097
013153
417085
919198
988711
488665`.split('\n');

function buildChain(startIdx) {
  const used = Array(data.length).fill(false);
  let chain = [startIdx];
  used[startIdx] = true;
  let current = data[startIdx];

  while (true) {
    let found = false;
    for (let i = 0; i < data.length; ++i) {
      if (used[i]) continue;
      if (
        current.slice(-2) === data[i].slice(0, 2) ||
        current.slice(0, 2) === data[i].slice(-2)
      ) {
        chain.push(i);
        used[i] = true;
        current =
          current.slice(-2) === data[i].slice(0, 2)
            ? current + data[i].slice(2)
            : data[i].slice(0, -2) + current;
        found = true;
        break;
      }
    }
    if (!found) break;
  }
  return chain;
}

let best = [];
for (let i = 0; i < data.length; ++i) {
  const chain = buildChain(i);
  if (chain.length > best.length) best = chain;
}

let result = data[best[0]];
for (let i = 1; i < best.length; ++i) {
  const frag = data[best[i]];
  if (result.slice(-2) === frag.slice(0, 2)) {
    result += frag.slice(2);
  } else if (result.slice(0, 2) === frag.slice(-2)) {
    result = frag.slice(0, -2) + result;
  }
}
console.log(result);
console.log('Length:', best.length);