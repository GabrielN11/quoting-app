import styled from 'styled-components/native'
import colors from '../../../assets/constants/colors'

export const PublicationView = styled.View`
    flex-direction: column;
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

export const PublicationShowMore = styled.Text`
    color: ${colors.FONT_DEFAULT_PLACEHOLDER};
    text-align: left;
    font-size: 18px;
    margin-top: 10px;
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
    font-size: 20px;
`

export const PublicationActions = styled.View`
    position: absolute;
    bottom: 20px;
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
`