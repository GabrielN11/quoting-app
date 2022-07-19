import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const SearchText = styled.Text`
    text-align: center;
    font-size: 20px;
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
`

export const SearchOptionsView = styled.View`
    flex-direction: row;
    justify-content: center;
`

export const SearchOption = styled.TouchableOpacity`
    background-color: ${({backgroundColor}) => backgroundColor || colors.BUTTON_BACKGROUND_PRIMARY};
    border-radius: 15px;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
    margin-horizontal: 15px;
`

export const SearchOptionText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 22px;
    margin-bottom: 10px;
`