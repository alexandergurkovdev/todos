import React, {Component} from 'react';
import {connect} from 'react-redux';
import Checkbox from '../../../components/UI/Forms/Checkbox/Checkbox';
import * as actions from '../../../store/actions';

import styled from 'styled-components';

const CheckboxWrapper = styled.div `
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  right: 7rem;
`;

class DoneTodo extends Component {
  async toggleDone(e) {
    const {todo, isDone} = this.props;
    e.preventDefault();
    await this.props.doneTodo(
      todo.id, isDone
    );
  }

  render() {
    const {isDone, setIsDone} = this.props;

    return (
      <CheckboxWrapper>
        <label>
          <Checkbox
            onInput={(e) => this.toggleDone(e)}
            onChange={() => setIsDone(!isDone)}
            checked={isDone}
          />
        </label>
      </CheckboxWrapper>
    )
  }
};

const mapDispatchToProps = {
  doneTodo: actions.doneTodo
};

export default connect(null, mapDispatchToProps)(DoneTodo);
