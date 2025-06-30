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
