import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const TouchableItem = styled.TouchableOpacity`
    margin: 15px;
    padding: 20px;
    background-color: ${colors.BAR_BACKGROUND};
    align-self: stretch;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
`

export const TextItem = styled.Text`
    font-family: 'SourceSans';
    font-size: 22px;
    color: ${colors.FONT_DEFAULT_COLOR};
`