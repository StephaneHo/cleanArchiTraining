Note 1 on the tests for the ViewModels:

for the tests for the dispatch in the ViewModels (testing the arguments of the function that was called by the dispatch), i tried this solution https://devpress.csdn.net/react/630b3573c677032930817fb0.html but it did not work

if you mock react-redux you will be able to verify arguments for useDispatch call. Also in such a case you will need to re-create useSelector's logic(that's really straightforward and actually you don't have to make mock be a hook). Also with that approach you don't need mocked store or <Provider> at all.

import { useSelector, useDispatch } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
useSelector: jest.fn(),
useDispatch: () => mockDispatch
}));

it('loads data on init', () => {
const mockedDispatch = jest.fn();
useSelector.mockImplementation((selectorFn) => selectorFn(yourMockedStoreData));
useDispatch.mockReturnValue(mockedDispatch);
mount(<Router><Clients history={historyMock} /></Router>);
expect(mockDispatch).toHaveBeenCalledWith(/_arguments your expect_/);
});

Note 2 for the end to end tests

parfois le rendu d un test leake dans le test precedent
pour corriger:
// warning https://github.com/testing-library/react-testing-library/issues/716
afterEach(() => {
window.history.pushState(null, document.title, "/");
});

Note 3 for the type on createAsnycThunk on the getState
https://github.com/reduxjs/redux-toolkit/issues/793

dans la declaration des generiques:

-{getState: () => RootState}
+{state: RootState}

Note 4 penser bien utiliser le dispatch de

- import { useDispatch } from "@foodsapp/store";

* import { useDispatch } from "react-redux";

unkDispatch<unknown, unknown, UnknownAction> | undefined; ... 4 more ...; rejectedMeta?: unknown; }>' is not assignable to parameter of type 'UnknownAction'.ts(2345)

Note 5

testing-library

waitFor: attend que toutes les promesses soient resolues avant d agir
act: il agit et attend que tout soit resolu avant de continuer

Note 6

act from react-dom/test-utils has been deprecated in favor of act from react.

- import {act} from 'react';

* import {act} from 'react-dom/test-utils';

Note 7

- import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

* import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

on ne vas pas utiliser les hooks pour react, on va creer nos propres custom hook

Note 8

https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks
Creating a memoized selector creator
const createGetPostSelector = createSelector(
(id: string) => id,
(id) => api.endpoints.getPost.select(id),
)

Note 9

https://jestjs.io/docs/mock-functions
Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.

There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.

.mock property
All mock functions have this special .mock property, which is where data about how the function has been called and what the function returned is kept. The .mock property also tracks the value of this for each call, so it is possible to inspect this as well:

Note 10
https://jestjs.io/docs/expect#expectobjectcontainingobject

xpect.objectContaining(object) matches any received object that recursively matches the expected properties. That is, the expected object is a subset of the received object. Therefore, it matches a received object which contains properties that are present in the expected object.

Instead of literal property values in the expected object, you can use matchers, expect.anything(), and so on.

For example, let's say that we expect an onPress function to be called with an Event object, and all we need to verify is that the event has event.x and event.y properties. We can do that with:

test('onPress gets called with the right thing', () => {
const onPress = jest.fn();
simulatePresses(onPress);
expect(onPress).toHaveBeenCalledWith(
expect.objectContaining({
x: expect.any(Number),
y: expect.any(Number),
}),
);
});

Note 11
https://creately.com/guides/class-diagram-relationships/
