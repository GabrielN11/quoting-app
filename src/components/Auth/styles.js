import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const AuthContainer = styled.KeyboardAvoidingView`
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: ${colors.BACKGROUND};
    width: 100%;
    height: 100%;
    flex: 1;
`

export const AuthView = styled.View`
    flex-direction: column;
    align-items: center;
    background-color: ${colors.BACKGROUND};
`

export const AuthText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 18px;
    margin: 15px 0;
`

export const AuthButton = styled.TouchableOpacity`
    background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : colors.BUTTON_BACKGROUND_DEFAULT};
    border-radius: 15px;
    padding: 10px;
    margin: 0 15px;
    align-self: stretch;
`

export const AuthBtnText = styled.Text`
    text-align: center;
    font-family: 'SourceSans';
    font-size: 22px;
    color: ${({color}) => color ? color : colors.FONT_DEFAULT_COLOR}
`

export const AuthInput = styled.TextInput`
    border-radius: 15px;
    padding: 7px;
    background-color: ${colors.INPUT_BACKGROUND_DEFAULT};
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 18px;
`

