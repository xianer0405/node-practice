function createLinkList(arr = []) {
  let head = { next: null };

  let nextNode = null;
  for (i = arr.length - 1; i >= 0; i--) {
    console.log(i, arr[i]);

    let node = {
      value: arr[i],
      next: nextNode
    }
    nextNode = node;
    head.next = node;
  }

  return head;
}

let a = createLinkList([100,200,300,400])
console.log(JSON.stringify(a));
let n = a.next
while(n) {
  console.log(n.value);
  n = n.next;
}