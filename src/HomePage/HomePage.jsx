import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StudyOverview from "../_components/StudyOverview";
import { userActions } from '../_actions';
import { Container, Row, Col } from "shards-react";
import Draggable from 'react-draggable';
class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <Container fluid>
            <Row>
            <div className="col-lg-4"> <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">For each label in legend</div>
          <div> create icon, when dragged into canvas area</div>
          <div>graph will change, icon will dissapear</div>
        </div>
      </Draggable></div>

                 <div className="col-lg-8">
                <h3>Hi {user.firstName}, welcome to your dashboard.</h3>
                <StudyOverview/>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                </div>
            </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
