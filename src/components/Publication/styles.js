import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const PublicationItemButton = styled.TouchableOpacity`
    align-items: stretch;
    background-color: ${colors.PRIMARY};
    padding: 20px;
    margin: 10px;
    border-radius: 15px;
`

export const PublicationItemText = styled.Text`
    font-family: 'SourceSans';
    font-size: 18px;
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

export const PublicationDetailsView = styled.View`
    margin-bottom: 5px;
    right: -5px;
    align-self: flex-end;
`

export const DetailsView = styled.View`
    min-width: 60%;
    background-color: ${colors.BACKGROUND};
    padding: 15px;
    position: relative;
    border-radius: 15px;
`

export const DetailsClose = styled.View`
    position: absolute;
    right: -10px;
    top: -10px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.BACKGROUND};
`

export const DetailsLabel = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-weight: 800;
    font-size: 16px;
`

export const DetailsText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 16px;
`

export const DetailsOptionsView = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-around;
`

export const DetailBtn = styled.TouchableOpacity`
    align-items: center;
`

export const DetailBtnLabel = styled.Text`
    font-size: 16px;
    color: ${colors.ALERT};
    text-align: center;
`