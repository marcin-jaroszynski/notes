import Stack from '../../../../src/model/stack.js'

describe('Stack model', () => {
  it('push', () => {
    let stack = new Stack();
    for (let i = 1; i <= 10; i++) {
      stack.push(i);
    }
    expect(10).to.equal(stack.data.length, 'Length stack afert insert elements');
    stack.push(11);
    expect(10).to.equal(stack.data.length, 'Length stack after insert next element');
    expect(2).to.equal(stack.floor());
    expect(11).to.equal(stack.peek());
  });
});