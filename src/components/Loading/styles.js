import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const LoadingContainer = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({transparent}) => !transparent ? 'rgba(0, 0, 0, 0.8)' : 'unset'};
    z-index: 10;
    justify-content: center;
    align-items: center;
`