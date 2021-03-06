/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {timer, map, merge, delay, take} from '../ows.js';
import {readAll} from './utils.js';

describe('merge()', function () {
  it('merges multiple observables into one', async function () {
    const [o1, o2] = timer(10).tee();
    const o = merge(
      o1.pipeThrough(map(_ => 'o1')),
      o2.pipeThrough(map(_ => 'o2')).pipeThrough(delay(3)),
    ).pipeThrough(take(6));
    expect(await readAll(o)).to.deep.equal(['o1', 'o2', 'o1', 'o2', 'o1', 'o2']);
  });
});
