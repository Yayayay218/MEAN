import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

import PlaylistIcon from 'material-ui/svg-icons/maps/layers';

const styles = {
    card: { borderLeft: 'solid 4px #6a5ff4', flex: '1', marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#6a5ff4' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <PlaylistIcon style={styles.icon} />
        <CardTitle title={value} subtitle='Number of Playlist' />
    </Card>
)