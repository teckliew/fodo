import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';

import Camera from '../components/Camera'

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="camera" />
			<Camera />
		</Panel>
	)
});

export default MainPanel;
