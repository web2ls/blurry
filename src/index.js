import './style';
import { Component } from 'preact';
import Handler from './components/Handler';

export default class App extends Component {
	render() {
		return (
			<div>
				<Handler />
			</div>
		);
	}
}
