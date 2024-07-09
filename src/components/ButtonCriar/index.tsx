import React from 'react';
import { ButtonContainer } from './styles';
import {IButtonCriar} from './types';

const ButtonCriar = ({title, variant='primary', onClick}: IButtonCriar) => {
  return (
    <ButtonContainer variant={variant} onClick={onClick}>
        {title}
    </ButtonContainer>
  )
}
export { ButtonCriar }
