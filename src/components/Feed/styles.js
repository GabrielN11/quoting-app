import styled from 'styled-components/native'
import colors from '../../../assets/constants/colors'

export const PublicationView = styled.View`
    flex-direction: column;
    margin-top: 30px;
    position: relative;
    height: 100%;
    margin: 0 30px;
`

export const PublicationText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    text-align: center;
    font-size: 22px;
    font-family: 'Montserrat';
    font-style: italic;
`

export const PublicationAuthor = styled.Text`
    color: ${colors.FONT_DEFAULT_PLACEHOLDER};
    font-size: 18px;
    text-align: right;
    font-family: 'Montserrat';
`

export const PublicationWarning = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR}
    text-align: center
    font-family: 'SourceSans';
    font-size: 22px;
`

export const PublicationActions = styled.View`
    position: absolute;
    bottom: 20%;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
`