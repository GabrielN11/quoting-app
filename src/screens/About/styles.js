import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const LogoImage = styled.Image`
    width: 130px;
    height: 130px;
    resize-mode: contain;
`

export const AboutTitle = styled.Text`
    font-family: 'Montserrat'
    font-size: 24px;
    color: ${colors.FONT_DEFAULT_COLOR};
`

export const AboutText = styled.Text`
    margin: 15px 0;
    padding: 0 20px;
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 16px;
`

export const VersionText = styled.Text`
    font-family: 'SourceSans';
    color: #aaa;
    margin: 7px 0;
    font-size: 14px;
`
export const IconLabel = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
`