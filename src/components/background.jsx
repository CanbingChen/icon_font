import React from 'react';
import Particle from 'zhihu-particle';

export default class Background extends React.Component {
    componentDidMount() {
        new Particle(this.background, {interactive: true, density: 'low'});
    }

    render() {
        return (
            <div ref={(background) => {
                this.background = background;
            }}
                 className="background"
            />
        )
    }
}
