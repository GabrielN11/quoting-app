import styled from 'styled-components/native'
import colors from '../../../assets/constants/colors'

export const BarContainer = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row;
    background-color: ${colors.BAR_BACKGROUND};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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
    background-color: ${colors.BACKGROUND};
    border: 4px solid ${colors.BAR_BACKGROUND};
    top: -30px;
`