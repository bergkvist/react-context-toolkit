"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var use_context_selector_1 = require("use-context-selector");
function createStore(slices) {
    var initialState = {};
    var reducers = {};
    for (var _i = 0, slices_1 = slices; _i < slices_1.length; _i++) {
        var slice = slices_1[_i];
        initialState[slice.name] = slice.reducer(void 0, {});
        reducers[slice.name] = slice.reducer;
    }
    var rootReducer = function (state, action) {
        var newState = {};
        for (var _i = 0, slices_2 = slices; _i < slices_2.length; _i++) {
            var name = slices_2[_i].name;
            newState[name] = reducers[name](state[name], action);
        }
        return newState;
    };
    var Store = use_context_selector_1.createContext({
        state: initialState,
        dispatch: function (action) { return void 0; },
    });
    function useSelector(selector) {
        return use_context_selector_1.useContextSelector(Store, function (store) { return selector(store.state); });
    }
    function useDispatch() {
        return use_context_selector_1.useContextSelector(Store, function (store) { return store.dispatch; });
    }
    var StateProvider = function (_a) {
        var children = _a.children;
        var _b = react_1.useReducer(rootReducer, initialState), state = _b[0], dispatch = _b[1];
        return (react_1.default.createElement(Store.Provider, { value: { state: state, dispatch: dispatch } }, children));
    };
    return {
        StateProvider: StateProvider,
        useSelector: useSelector,
        useDispatch: useDispatch,
        Store: Store,
        initialState: initialState,
        rootReducer: rootReducer,
    };
}
exports.createStore = createStore;
var toolkit_1 = require("@reduxjs/toolkit");
exports.createSlice = toolkit_1.createSlice;
//# sourceMappingURL=index.js.map