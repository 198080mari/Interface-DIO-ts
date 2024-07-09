import styled, { css } from 'styled-components';
import { IButtonCriarStyled } from './types';

export const ButtonContainer = styled.button<IButtonCriarStyled>`
    font-weight: 700px;
    font-size: 14px;
    line-height: 19px;
    color: #14AE5C;
    background: transparent;
    border: none;

    ${({variant}) => variant !== 'primary' && css`

    &:hover {
        opacity: .6;
        cursor: pointer;
    }
`}
`

