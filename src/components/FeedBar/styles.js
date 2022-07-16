import styled from 'styled-components/native'
import colors from '../../../assets/constants/colors'

export const BarContainer = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row;
    background-color: ${colors.BAR_BACKGROUND};
    border-width: 1px;
    border-style: solid;
    border-top-color: #272727;
`

export const BarItem = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`

export const BarButton = styled.TouchableOpacity`
    align-items: center;
`

export const BarAdd = styled.View`
    justify-content: center;
    width: 66px;
    height: 66px;
    border-radius: ${66/2}px;
`