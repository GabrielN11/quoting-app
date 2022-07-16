import styled from 'styled-components/native'
import colors from '../../../assets/constants/colors'

export const UserItemButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${colors.PRIMARY};
    padding: 20px;
    margin: 10px;
    border-radius: 15px;
`

export const UsernameText = styled.Text`
    font-family: 'SourceSans';
    font-size: 16px;
    color: ${colors.FONT_DEFAULT_COLOR};
`

export const NameText = styled.Text`
    font-family: 'SourceSans';
    font-size: 18px;
    color: ${colors.FONT_DEFAULT_COLOR};
`