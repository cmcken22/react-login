const {Set, Map} = require('immutable');

const Actions = {
  types: new Set(),
  creators: new Map(),

  registerType(type) {
    if (this.types.has(type)) {
      throw new Error(`Attempt to register existing action '${type}'`);
    }
    this.types = this.types.add(type);
    return type
  },

  registerCreator(creator) {
    if (this.creators.has(creator)) {
      throw new Error(`Attempt to register existing action '${creator}'`);
    }
    this.creators = this.creators.set(creator);
  },

  creator(type, creator) {

    this.registerType(type)

    if(!creator) {
      creator = this.createActionFromPayload(type)
    } else {
      if(typeof creator === 'function') {
        this.registerCreator(creator)
        creator = creator.bind(null, type)
      } else {
        throw new Error(`creator parameter must be a function`)
      }
    }

    creator.toString = () => type.toString();

    return creator
  },

  creatorStrict(reducerName, action, actionCreator) {
    creator(`${reducerName}_${action}`, actionCreator);
  },

  createAction(type, payload) {
    return {
      type,
      payload
    };
  },

  createActionFromPayload(type) {
    return (payload) => this.createAction(type, payload)
  },

  createType(actionNamespace, action) {
    return actionNamespace + '_' + action
  },

  commonImmutable(actionNamespace) {
    const set = this.creator(
      this.createType(actionNamespace, 'SET'),
      (type, key, value) => this.createAction(type, {key, value})
    )

    const setIn = this.creator(
      this.createType(actionNamespace, 'SET_IN'),
      (type, keys, value) => this.createAction(type, {keys, value})
    )

    const merge = this.creator(
      this.createType(actionNamespace, 'MERGE')
    )

    return {
      set,
      setIn,
      merge
    }
  },

  commonImmutableHandlers(actions) {
    return {
      [actions.set]: (state, action) => state
          .set(action.payload.key, action.payload.value),

      [actions.setIn]: (state, action) => state
        .setIn(action.payload.keys, action.payload.value),

      [actions.merge]: (state, action) => state
        .merge(action.payload)
    }
  }
};

export default Actions;