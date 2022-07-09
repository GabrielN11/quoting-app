import styled from 'styled-components/native';

import colors from '../../../../assets/constants/colors';

export const ReportItemButton = styled.TouchableOpacity`
    background-color: ${colors.BAR_BACKGROUND};
    padding: 10px 15px;
    margin: 10px;
    border-radius: 15px;
`

export const ReportItemMain = styled.View`
    flex-direction: row;
    align-items: center;
`

export const ReportItemData = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    margin-top: 10px;
`

export const ReportItemTitle = styled.Text`
    font-size: 20px;
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
`

export const ReportItemText = styled.Text`
    font-size: 15px;
    color: ${colors.FONT_DEFAULT_COLOR};
`