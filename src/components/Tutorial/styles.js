import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const TutorialContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
`

export const TutorialView = styled.View`
    background-color: ${colors.BACKGROUND};
    align-items: center;
    padding: 25px;
    width: 95%;
    height: 85%;
    border-radius: 15px;
`

export const TutorialTitle = styled.Text`
    font-family: 'Montserrat';
    font-size: 20px;
    color: ${colors.FONT_DEFAULT_COLOR};
    text-align: center;
`

export const TutorialText = styled.Text`
    font-family: 'SourceSans';
    font-size: 16px;
    color: ${colors.FONT_DEFAULT_COLOR};
    padding: 7px 0;
    margin-bottom: 10px;
    margin-horizontal: 7px;
`

export const ImageContainer = styled.View`
    border: 1px solid ${colors.INPUT_BACKGROUND_DEFAULT};
    flex: 1;
    margin-horizontal: 7px;
`

export const TutorialImage = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: contain;
`