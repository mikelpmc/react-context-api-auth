import React from 'react';
import { Context } from './../provider/';

/**
 * Higher Order Component to compose components with context data and actions
 *
 * @param {Component} ComposedComponent
 *
 * @returns {Component} - The new composed component
 */
const withState = ComposedComponent => props => (
    <Context.Consumer>
        {({ store, actions }) => (
            <ComposedComponent store={store} actions={actions} {...props} />
        )}
    </Context.Consumer>
);

export default withState;
