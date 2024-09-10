import { expect, test } from 'vitest'
import * as am from '../src/AppointmentManager';

test('test AppointmentManager', () => {
  expect(am.createProvider()).toBeTruthy();
});
