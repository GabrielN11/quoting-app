import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const HomeView = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${colors.BACKGROUND};
    flex-direction: column;
    align-items: center;
`

export const HomeHeader = styled.View`
    flex-direction: row-reverse;
    padding: 0 15px;
    flex: 1;
    width: 100%;
`