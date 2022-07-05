import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const TouchableItem = styled.TouchableOpacity`
    margin: 15px;
    padding: 15px;
    background-color: ${({background}) => background ? background : colors.BAR_BACKGROUND};
    align-self: stretch;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
`

export const TextItem = styled.Text`
    font-family: 'SourceSans';
    font-size: 16px;
    color: ${colors.FONT_DEFAULT_COLOR};
`

export const TextTitle = styled.Text`
    font-family: 'Montserrat';
    font-size: 22px;
    text-align: center;
    color: ${colors.FONT_DEFAULT_COLOR};
`