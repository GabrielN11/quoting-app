import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const FormContainer = styled.KeyboardAvoidingView`
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-color: ${colors.BACKGROUND};
    width: 100%;
    height: 100%;
    flex: 1;
`

export const FormText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 18px;
    margin: 15px 0;
`

export const FormButton = styled.TouchableOpacity`
    background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : colors.BUTTON_BACKGROUND_DEFAULT};
    border-radius: 15px;
    padding: 10px;
    margin: 0 15px;
    align-self: stretch;
`

export const FormBtnText = styled.Text`
    text-align: center;
    font-family: 'SourceSans';
    font-size: 22px;
    color: ${({color}) => color ? color : colors.FONT_DEFAULT_COLOR}
`

export const FormInput = styled.TextInput`
    border-radius: 15px;
    padding: 7px;
    background-color: ${colors.INPUT_BACKGROUND_DEFAULT};
    color: ${colors.FONT_DEFAULT_COLOR};
    font-size: 18px;
`