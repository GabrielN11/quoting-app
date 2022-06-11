import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const CommentaryContainer = styled.KeyboardAvoidingView`
    width: 100%;
    height: 100%;
    background-color: ${colors.BACKGROUND};
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
`

export const CommentariesView = styled.ScrollView`
    flex-direction: column;
    flex: 1;
`

export const CommentaryView = styled.View`
    flex-direction: column;
    border-radius: 15px;
    padding: 10px;
    background-color: ${colors.BAR_BACKGROUND};
    margin: 10px;
`

export const CommentaryInfo = styled.Text`
    font-size: 18px;
    color: ${colors.FONT_DEFAULT_PLACEHOLDER};
    font-family: 'Montserrat';
`

export const CommentaryText = styled.Text`
    font-family: 'SourceSans';
    font-size: 20px;
    color: ${colors.FONT_DEFAULT_COLOR};
`

export const CommentaryTextInput = styled.TextInput`
    flex: 1;
    margin-right: 7px;
    background-color: ${colors.INPUT_BACKGROUND_DEFAULT};
    padding: 7px;
    font-size: 18px;
    color: ${colors.FONT_DEFAULT_COLOR};
    border-radius: 15px;
`