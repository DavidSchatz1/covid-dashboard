import { NumericDataPipe } from './numeric-data.pipe';

describe('NumericDataPipe', () => {
  it('create an instance', () => {
    const pipe = new NumericDataPipe();
    expect(pipe).toBeTruthy();
  });
});
