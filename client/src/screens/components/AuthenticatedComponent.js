import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { resetApplication } from '../store/session/action'

export function requireAuthentication(Component) {

	class AuthenticatedComponent extends React.Component {

		componentWillMount() {
			this.checkAuth(this.props.isAuthenticated);
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.isAuthenticated);
		}

		checkAuth(isAuthenticated) {
			if (!isAuthenticated) {
				this.props.dispatch(resetApplication());
				this.props.history.push('/');
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated
						? <Component {...this.props} />
						: <Redirect to={{
							pathname: '/',
							state: { from: this.props.location }
						}} />
					}
				</div>
			)
		}
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: state.session.isAuthenticated
	});

	return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}