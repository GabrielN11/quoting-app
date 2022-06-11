import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const ProfileName = styled.Text`
    font-family: 'Montserrat';
    font-size: 30px;
    text-align: center;
    color: ${colors.FONT_DEFAULT_COLOR};
`

export const ProfileUsername = styled.Text`
    font-family: 'SourceSans';
    font-size: 20px;
    text-align: center;
    color: ${colors.FONT_DEFAULT_PLACEHOLDER};
`

export const ProfileText = styled.Text`
    color: ${({color}) => color || colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 18px;
    align-self: flex-start;
`

export const PinnedView = styled.View`
    margin: 25px 0;
`

export const ProfileItemsView = styled.View`
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 15px;
`

export const ProfileItem = styled.TouchableOpacity`
    margin: 15px;
    background-color: ${({backgroundColor}) => backgroundColor || 'darkorange'};
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    max-width: 50%;
`

export const ProfileCount = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 40px;
    font-family: 'SourceSans';
`