import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const PublicationItemView = styled.TouchableOpacity`
    align-items: stretch;
    background-color: ${colors.BAR_BACKGROUND};
    padding: 20px;
    margin: 10px;
    border-radius: 15px;
`

export const PublicationItemText = styled.Text`
    font-family: 'SourceSans';
    font-size: 20px;
    color: ${colors.FONT_DEFAULT_COLOR}
`

export const PublicationInfoView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

export const PublicationInfoItem = styled.View`
    flex-direction: row;
    align-items: center;
`

export const PublicationInfoText = styled.Text`
    font-family: 'SourceSans';
    font-size: 22px;
    margin: 0 7px;
    color: ${colors.FONT_DEFAULT_COLOR};
`