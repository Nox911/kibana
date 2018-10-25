/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { resolveApi } from './server';

describe('resolveApi', () => {
  it('allows known APIs to be resolved', () => {
    const mockReply = jest.fn((result) => ({ type: () => result }));
    const result = resolveApi('Sense Version', ['es_6_0'], mockReply);
    expect(result).toMatchObject({
      es_6_0: {
        endpoints: expect.any(Object),
        globals: expect.any(Object),
        name: expect.any(String),
      }
    });
  });

  it('does not resolve APIs that are not known', () => {
    const mockReply = jest.fn((result) => ({ type: () => result }));
    const result = resolveApi('Sense Version', ['unknown'], mockReply);
    expect(result).toEqual({});
  });

  it('handles request for apis that are known and unknown', () => {
    const mockReply = jest.fn((result) => ({ type: () => result }));
    const result = resolveApi('Sense Version', ['es_6_0'], mockReply);
    expect(result).toMatchObject({
      es_6_0: {
        endpoints: expect.any(Object),
        globals: expect.any(Object),
        name: expect.any(String),
      }
    });
  });
});