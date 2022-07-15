import styled from 'styled-components/native';
import colors from '../../../assets/constants/colors';

export const ModalContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 100px;
`

export const ModalView = styled.View`
    background-color: ${colors.FONT_DEFAULT_COLOR};
    border-radius: 15px;
    max-height: 70%;
`

export const ModalTouchable = styled.TouchableOpacity`
    padding: 15px 40px;
    align-items: center;
    justify-content: center;
`

export const ModalText = styled.Text`
    color: ${({color}) => color || '#000'};
    font-size: 20px;
    font-family: 'SourceSans';
`