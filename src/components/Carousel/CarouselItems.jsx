import { View, Text } from 'react-native'
import React from 'react'
import { CarouselItem } from './styles'

export default function CarouselItems({children}) {
  return (
    <CarouselItem>
        {children}
    </CarouselItem>
  )
}