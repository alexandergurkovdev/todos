import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions';

import styled from 'styled-components';

const Button = styled.button `
  padding: 0;
  background: none;
  color: var(--color-whiteColor);
  border: 0;
`;

const ImportantWrapper = styled.form `
  transition: .2s all;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 1rem;
  padding: 0;
  background: none;
  border: 0;
  font-size: 1.4rem;
  right: 9rem;
`;

class DoneTodo extends Component {
  async toggleImportant(e) {
    e.preventDefault();
    const {todo, isImportant} = this.props;
    await this.props.importantTodo(
      todo.id, isImportant
    );
  }

  render() {
    const {setisImportant, isImportant} = this.props;
    
    return (
      <ImportantWrapper onSubmit={(e) => this.toggleImportant(e)}>
        <Button type="submit" onClick={() => setisImportant(!isImportant)}>
          <FontAwesomeIcon
            icon={faExclamation}
          />
        </Button>
      </ImportantWrapper>
    )
  }
};

const mapDispatchToProps = {
  importantTodo: actions.importantTodo
};

export default connect(null, mapDispatchToProps)(DoneTodo);
