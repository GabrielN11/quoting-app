import styled from 'styled-components/native';

import colors from '../../../../assets/constants/colors';

export const CategoryItem = styled.TouchableOpacity`
    background-color: ${({color}) => color ? color : colors.BAR_BACKGROUND};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
`

export const CategoryTitle = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 18px;
    font-family: 'SourceSans';
`

export const ScreenTitle = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 22px;
    font-family: 'Montserrat';
    align-self: center;
    margin-bottom: 15px;
`