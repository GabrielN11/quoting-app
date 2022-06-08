import styled from 'styled-components/native';

import colors from '../../../assets/constants/colors';

export const CarouselItem = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
`

export const CarouselText = styled.Text`
    color: ${colors.FONT_DEFAULT_COLOR};
    font-family: 'SourceSans';
    font-size: 22px;
    margin: 15px 0;
    padding: 0 15px;
`

export const CarouselImage = styled.Image`
    width: 50%;
    height: 50%;
    align-self: flex-end;
`
