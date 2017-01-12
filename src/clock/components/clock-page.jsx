import React from 'react';
import { connect } from 'react-redux';
import { changeDate } from '../actions';
import { getTime } from '../selectors';

import s from './clock-page.css';

export class ClockPage extends React.Component {
    componentDidMount() {
        this.intervalId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick() {
        const { dispatch } = this.props;
        dispatch(changeDate(new Date()));
    }

    render() {
        return (
            <div className={s.clockPage}>
                <span>The time is </span>
                <h2>{this.props.time}</h2>
            </div>
        );
    }

}

ClockPage.propTypes = {
    time: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        time: getTime(state)
    };
};

export default connect(
    mapStateToProps
)(ClockPage);

